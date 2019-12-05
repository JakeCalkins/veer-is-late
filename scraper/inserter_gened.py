#import psycopg2
import json
import re

def connect():
    """ Connect to the elephantSQL server """
    conn = None
    try:
        # Connect to elephantSQL
        print("\nConnecting to elephantSQL server\n")
        conn = psycopg2.connect(host="salt.db.elephantsql.com", database="oohprrpx", user="oohprrpx", password="VCPIDRy5mbc2oRw7fiPqVEwDgs5GfW8R")

        print("Connection successful\n")

        # Successful connection, create cursor to parse query results
        cur = conn.cursor()
        print("Executing queries\n")

        with open("values.json") as json_file:

            # Load JSON data
            data = json.load(json_file)

            for course in data.values():

                major = course[0] # Major literal                    [ex. PSYCH, STAT, ACCNT]
                cnum  = course[1] # Course number literal            [ex. 789, 892A, 296ISH]
                sect  = course[2] # Section ID used for lab          [ex. 01, 01AA, 01AJ]
                typ   = course[3] # Type of course                   [ex. IND, LAB, DIS, LEC, SEM, PRA, COL]
                title = course[4] # Title of course                  [ex. Game Theory, Introduction to Political Economy]
                prof  = course[5] # Professor(s) first and last name [ex. Ertugrul Tonak, William Leonard;Dennis Goeckel]
                times = course[6] # Time of day / Days per wk        [ex. M W F 9:05AM 9:55 AM]

                # Extract first and last names from professor JSON, split " " and ";"
                # to extract names and handle multiple professor cases
                professor_names = [name.split(" ") for name in prof.split(";") if name]
                stored_names = []
                for pair in professor_names:

                    fname = pair[0]
                    lname = pair[1]
                    stored_names.append((fname, lname))

                    # Insert professor names into database
                    cur.execute("INSERT INTO Professors(first_name, last_name) VALUES(%s, %s)", ((fname, lname)))
                    print((fname, lname))

                # Separate table for LAB and DIS
                if (typ == "LAB" or typ == "DIS"):
                    cur.execute("INSERT INTO Labs VALUES(%s, %s, %s, %s, %s)", ((cnum, major, title, times, "0")))
                    print("LAB: " + cnum + major + title + times)
                else:
                    if len(stored_names) > 0:
                        for pair in stored_names:
                            cur.execute("SELECT p.pid FROM Professors p, Courses c WHERE first_name = %s AND last_name = %s", ((pair[0], pair[1])))
                            pid = cur.fetchall()[0][0]

                            cur.execute("SELECT DISTINCT l.lid " + 
                                        "FROM labs l INNER JOIN Courses c " +
                                        "ON c.cname = l.title AND l.cnum = c.cnum AND l.major = c.major " +
                                        "WHERE c.cnum = %s AND c.cname = %s AND c.major = %s", ((cnum, title, major)))

                            labs = cur.fetchall()
                            if (len(labs) != 0):
                                for section in labs:
                                    lid = section[0]
                                    cur.execute("INSERT INTO Courses VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", ((cnum, title, "1", pid, lid, "0", "TBD", "TBD", major, "TBD", times)))
                                    print("LEC: %s %s %s %s %s %s", (cnum, major, title, times, str(pid), str(lid)))
                            else:
                                cur.execute("INSERT INTO Courses VALUES(%s, %s, %s, %s, null, %s, %s, %s, %s, %s, %s)", ((cnum, title, "1", pid, "0", "TBD", "TBD", major, "TBD", times)))
                                print("LEC NO LAB: %s %s %s %s %s", (cnum, major, title, times, str(pid)))
                    else:
                        # Courses with no professor ASSUME TO BE ONLINE COURSES
                        cur.execute("INSERT INTO Courses VALUES(%s, %s, %s, null, null, %s, %s, %s, %s, %s, %s)", ((cnum, title, "1", "1", "TBD", "TBD", major, "TBD", times)))
                        print("LEC NO PROF: %s %s %s %s", (cnum, major, title, times))

        save = input("Commit updates? [Y/N]\n")
        if (save == "Y"):
            print("Commiting changes\n")
            conn.commit()
        else:
            print("Commits aborted")

        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            conn.close()
            print("\nDatabase connection closed\n")

def findgeneds():
    geneds= []
    regex = re.compile("Gen\W{,3}Ed\W(.*?)\)")
    with open("values.json") as json_file:
        # Load JSON data
        data = json.load(json_file)

        for course in data.values():

            major = course[0] # Major literal                    [ex. PSYCH, STAT, ACCNT]
            cnum  = course[1] # Course number literal            [ex. 789, 892A, 296ISH]
            sect  = course[2] # Section ID used for lab          [ex. 01, 01AA, 01AJ]
            typ   = course[3] # Type of course                   [ex. IND, LAB, DIS, LEC, SEM, PRA, COL]
            title = course[4] # Title of course                  [ex. Game Theory, Introduction to Political Economy]
            prof  = course[5] # Professor(s) first and last name [ex. Ertugrul Tonak, William Leonard;Dennis Goeckel]
            times = course[6] # Time of day / Days per wk        [ex. M W F 9:05AM 9:55 AM]
            
            if(len(course) > 7):
                #print(course[7])
                result = regex.search(course[7])
                if result is not None:
                    geneds.append(str(result.group(1).strip().replace(" ", "")))
    print(geneds)
    print(len(geneds))
    print(geneds[10])

if __name__ == "__main__":
    findgeneds()