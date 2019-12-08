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

        with open("server/courses/output.json") as json_file:
            
            schedule = []

            # Load JSON data
            data = json.load(json_file)
            for i in data["required_courses"]["unsatisfied"]:
                #print(i)
                cur.execute("SELECT * FROM courses where cnum = %s and major=%s", ((i['cnum'], i['major'])))
                results = cur.fetchall()[0]
                print(results)
    
            


        #cur.execute("INSERT INTO Coursestemp VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", ((cnum, title, "4", pid, lid, "0", "TBD", "TBD", major, "TBD", times, typ)))
        #cur.execute("INSERT INTO Coursestemp VALUES(%s, %s, %s, %s, null, %s, %s, %s, %s, %s, %s, %s)", ((cnum, title, "3", pid, "0", "TBD", "TBD", major, "TBD", times, typ)))
        #cur.execute("INSERT INTO Coursestemp VALUES(%s, %s, %s, null, null, %s, %s, %s, %s, %s, %s, %s)", ((cnum, title, "3", "0", "TBD", "TBD", major, "TBD", times, typ)))
                

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            conn.close()
            print("\nDatabase connection closed\n")

if __name__ == "__main__":
    connect()