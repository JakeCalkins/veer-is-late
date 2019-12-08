import psycopg2
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

            regex = re.compile("Gen\W{,3}Ed\W(.*?)\)")

            # Load JSON data
            data = json.load(json_file)

            labID = 0
            mPrev = ""
            cPrev = ""
            tPrev = ""
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
                
                if(len(course) > 7):
                    result = regex.search(course[7])
                    if result is not None:
                        #print(str(result.group(1).strip().replace(" ", "")))
                        gened = (str(result.group(1).strip().replace(" ", "")))
                        cur.execute("UPDATE Courses SET gened = %s WHERE cnum = %s AND major = %s AND type = %s AND cname = %s AND time_of_day = %s", ((gened, cnum, major, typ, title, times)))

                '''
                professor_names = [name.split(" ") for name in prof.split(";") if name]
                stored_names = []
                for pair in professor_names:

                    fname = pair[0]
                    lname = pair[1]
                    stored_names.append((fname, lname))

                    # Insert professor names into database
                    #cur.execute("INSERT INTO Professorsfinal(fname, lname) VALUES(%s, %s)", ((fname, lname)))
                    #print((fname, lname))
                '''
                '''# Separate table for LAB and DIS
                if (typ == "LAB" or typ == "DIS"):
                    if (mPrev != major or cPrev != cnum or tPrev != title):
                        labID += 1
                    cur.execute("INSERT INTO Labsfinal VALUES(%s, %s, %s, %s, %s, %s)", ((cnum, major, title, times, typ, labID)))
                    mPrev = major
                    cPrev = cnum
                    tPrev = title
                    #print("LAB: " + cnum + major + title + times)
                    #z = 1
                '''
                #else:
                '''
                if len(stored_names) > 0:
                    for pair in stored_names:
                        cur.execute("SELECT p.pid FROM Professors p WHERE fname = %s AND lname = %s", ((pair[0], pair[1])))
                        #print((pair[0], pair[1]))
                        pid = cur.fetchall()[0][0]

                        cur.execute("SELECT DISTINCT l.lid " + 
                                    "FROM labsfinal l INNER JOIN Coursesnew c " +
                                    "ON c.cname = l.title AND l.cnum = c.cnum AND l.major = c.major " +
                                    "WHERE c.cnum = %s AND c.cname = %s AND c.major = %s", ((cnum, title, major)))

                        labs = cur.fetchall()
                        if (len(labs) != 0):
                            for section in labs:
                                lid = section[0]
                                # Lab DOES exist
                                cur.execute("INSERT INTO Coursestemp VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", ((cnum, title, "4", pid, lid, "0", "TBD", "TBD", major, "TBD", times, typ)))
                                print(major)
                        else:
                            # Lab does NOT exist
                            cur.execute("INSERT INTO Coursestemp VALUES(%s, %s, %s, %s, null, %s, %s, %s, %s, %s, %s, %s)", ((cnum, title, "3", pid, "0", "TBD", "TBD", major, "TBD", times, typ)))
                            print(major)
                else:
                    # Courses with no professor ASSUME TO BE ONLINE COURSES
                    cur.execute("INSERT INTO Coursestemp VALUES(%s, %s, %s, null, null, %s, %s, %s, %s, %s, %s, %s)", ((cnum, title, "3", "0", "TBD", "TBD", major, "TBD", times, typ)))
                    print(major)
                '''

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

if __name__ == "__main__":
    connect()