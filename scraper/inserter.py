import psycopg2
import json

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
            data = json.load(json_file)
            for course in data.values():
                major = course[0]
                cnum  = course[1]
                sect  = course[2]
                typ   = course[3]
                title = course[4]
                prof  = course[5]
                times = course[6]
                # Start with Professor table, split on " " and check for ; indicating multiple professors
                if (prof.find(";") >= 0):
                    profs = prof.split(";")
                    for professor in profs:
                        names = professor.split(" ")
                        fname = names[0]
                        lname = names[1]
                        if (lname.find("\'") >= 0):
                            idx = lname.index("\'")
                            lname = lname[:idx] + lname[idx+1:]
                        cur.execute("INSERT INTO Professor(first_name, last_name) VALUES(" + "\'" + fname + "\'" + "," + "\'" + lname + "\'" + ")")
                else:
                    names = prof.split(" ")
                    if len(names) > 1:
                        fname = names[0]
                        lname = names[1]
                        if (lname.find("\'") >= 0):
                            idx = lname.index("\'")
                            lname = lname[:idx] + lname[idx+1:]
                        cur.execute("INSERT INTO Professor(first_name, last_name) VALUES(" + "\'" + fname  + "\'" + "," + "\'" + lname + "\'" + ")")

                #cur.execute("INSERT INTO Course VALUES (cnum, title, CREDITS_NUM, START_TIME, PROF, ???, ???, LAB, HONORS, ONLINE, ???, END_TIME, ???, DAYS, MAJOR, PREREQS"
        
        conn.commit()
        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            conn.close()
            print("\nDatabase connection closed\n")

if __name__ == "__main__":
    connect()