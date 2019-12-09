import psycopg2
import json
import re
import random

def check_conflicts(schedule_arr, newclass):
    for c in schedule_arr:
        #see if classes are on the same day
        conflict = False
        if "M" in c[10] and "M" in newclass[10]:
            #print("found")
            time = re.compile("\d+")
            ampm = re.compile("[A-Z]+")
            fixedstartc = float(time.findall(c[10])[0]) + (float(time.findall(c[10])[1])/60.0)
            if(ampm.findall(c[10])[-2] == "PM"):
                fixedstartc += 12.0
            fixedstart = float(time.findall(newclass[10])[0]) + (float(time.findall(newclass[10])[1])/60.0)
            if(ampm.findall(newclass[10])[-2] == "PM"):
                fixedstart += 12.0
            fixedendc = float(time.findall(c[10])[2]) + (float(time.findall(c[10])[3])/60.0)
            if(ampm.findall(c[10])[-1] == "PM"):
                fixedendc += 12.0
            fixedend = float(time.findall(newclass[10])[2]) + (float(time.findall(newclass[10])[3])/60.0)
            if(ampm.findall(newclass[10])[-1] == "PM"):
                fixedend += 12.0

            if(max(fixedstart, fixedstartc) < min(fixedend, fixedendc)):
                #print("Conflict")
                conflict =  True

        if "TU" in c[10] and "TU" in newclass[10]:
            #print("found")
            time = re.compile("\d+")
            ampm = re.compile("[A-Z]+")
            fixedstartc = float(time.findall(c[10])[0]) + (float(time.findall(c[10])[1])/60.0)
            if(ampm.findall(c[10])[-2] == "PM"):
                fixedstartc += 12.0
            fixedstart = float(time.findall(newclass[10])[0]) + (float(time.findall(newclass[10])[1])/60.0)
            if(ampm.findall(newclass[10])[-2] == "PM"):
                fixedstart += 12.0
            fixedendc = float(time.findall(c[10])[2]) + (float(time.findall(c[10])[3])/60.0)
            if(ampm.findall(c[10])[-1] == "PM"):
                fixedendc += 12.0
            fixedend = float(time.findall(newclass[10])[2]) + (float(time.findall(newclass[10])[3])/60.0)
            if(ampm.findall(newclass[10])[-1] == "PM"):
                fixedend += 12.0

            if(max(fixedstart, fixedstartc) < min(fixedend, fixedendc)):
                #print("Conflict")
                conflict =  True

        if "W" in c[10] and "W" in newclass[10]:
            #print("found")
            time = re.compile("\d+")
            ampm = re.compile("[A-Z]+")
            fixedstartc = float(time.findall(c[10])[0]) + (float(time.findall(c[10])[1])/60.0)
            if(ampm.findall(c[10])[-2] == "PM"):
                fixedstartc += 12.0
            fixedstart = float(time.findall(newclass[10])[0]) + (float(time.findall(newclass[10])[1])/60.0)
            if(ampm.findall(newclass[10])[-2] == "PM"):
                fixedstart += 12.0
            fixedendc = float(time.findall(c[10])[2]) + (float(time.findall(c[10])[3])/60.0)
            if(ampm.findall(c[10])[-1] == "PM"):
                fixedendc += 12.0
            fixedend = float(time.findall(newclass[10])[2]) + (float(time.findall(newclass[10])[3])/60.0)
            if(ampm.findall(newclass[10])[-1] == "PM"):
                fixedend += 12.0

            if(max(fixedstart, fixedstartc) < min(fixedend, fixedendc)):
                #print("Conflict")
                conflict =  True

        if "TH" in c[10] and "TH" in newclass[10]:
            #print("found")
            time = re.compile("\d+")
            ampm = re.compile("[A-Z]+")
            fixedstartc = float(time.findall(c[10])[0]) + (float(time.findall(c[10])[1])/60.0)
            if(ampm.findall(c[10])[-2] == "PM"):
                fixedstartc += 12.0
            fixedstart = float(time.findall(newclass[10])[0]) + (float(time.findall(newclass[10])[1])/60.0)
            if(ampm.findall(newclass[10])[-2] == "PM"):
                fixedstart += 12.0
            fixedendc = float(time.findall(c[10])[2]) + (float(time.findall(c[10])[3])/60.0)
            if(ampm.findall(c[10])[-1] == "PM"):
                fixedendc += 12.0
            fixedend = float(time.findall(newclass[10])[2]) + (float(time.findall(newclass[10])[3])/60.0)
            if(ampm.findall(newclass[10])[-1] == "PM"):
                fixedend += 12.0

            if(max(fixedstart, fixedstartc) < min(fixedend, fixedendc)):
                #print("Conflict")
                conflict =  True

        if "F" in c[10] and "F" in newclass[10]:
            #print("found")
            time = re.compile("\d+")
            ampm = re.compile("[A-Z]+")
            fixedstartc = float(time.findall(c[10])[0]) + (float(time.findall(c[10])[1])/60.0)
            if(ampm.findall(c[10])[-2] == "PM"):
                fixedstartc += 12.0
            fixedstart = float(time.findall(newclass[10])[0]) + (float(time.findall(newclass[10])[1])/60.0)
            if(ampm.findall(newclass[10])[-2] == "PM"):
                fixedstart += 12.0
            fixedendc = float(time.findall(c[10])[2]) + (float(time.findall(c[10])[3])/60.0)
            if(ampm.findall(c[10])[-1] == "PM"):
                fixedendc += 12.0
            fixedend = float(time.findall(newclass[10])[2]) + (float(time.findall(newclass[10])[3])/60.0)
            if(ampm.findall(newclass[10])[-1] == "PM"):
                fixedend += 12.0

            #check if times overlap
            if(max(fixedstart, fixedstartc) < min(fixedend, fixedendc)):
                #print("Conflict")
                conflict =  True
            
        return conflict

def generate(arr_dir, credits_min, credits_max, num_schedules):
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

        #schedule list
        schedules = []
        num_generated = 0

        with open(arr_dir) as json_file:
            
            schedule_req = []
            credits_added = 0

            # Load JSON data
            #add required classes 
            data = json.load(json_file)
            for i in data["required_courses"]["unsatisfied"]:
                #get clas info from database
                cur.execute("SELECT * FROM courses where cnum = %s and major=%s", ((i['cnum'], i['major'])))
                i = cur.fetchall()[0]
                #print(i)
                #schedule_req.append(i)
                if(check_conflicts(schedule_req, i)):
                    print("Couldn't build schedule with required classes")
                    return -1
                else:
                    if((credits_added + i[2]) > credits_max):
                        print("Required classes have too many credits")
                        return -1
                    else:
                        schedule_req.append(i)
                        credits_added += i[2]

            #add schedule if it already has required credits
            if(credits_added > credits_min):
                schedules.append(schedule_req)
                num_generated += 1

            already_added_courses = []

            schedules_list = []

            for i in range(num_schedules):
                gened = random.choice(data["geneds"])
                print(gened)
                new_sched = schedule_req[:]
                new_creds = credits_added
                while(new_creds < credits_min):
                    query_val = "%" + str(*gened) + "%"
                    cur.execute("SELECT * FROM courses WHERE gened LIKE %s and cnum like %s ORDER BY cnum", (query_val,"1%"))
                    results = cur.fetchall()
                    if(len(results) > 0):
                        newclass = random.choice(results)
                        if((check_conflicts(new_sched, newclass) == False) and (newclass not in already_added_courses)):
                            new_sched.append(newclass)
                            new_creds += newclass[2]
                            already_added_courses.append(newclass)
                schedules_list.append(new_sched)
            
            outdict = {}
            for i in range(num_schedules):
                #print(schedules_list[i])
                outdict[i] = {}
                for j in range(len(schedules_list[i])):
                    outdict[i][j] = {}
                    outdict[i][j]["cnum"] = schedules_list[i][j][0] 
                    outdict[i][j]["cname"] = schedules_list[i][j][1] 
                    outdict[i][j]["credits"] = schedules_list[i][j][2] 
                    outdict[i][j]["pid"] = schedules_list[i][j][3] 
                    outdict[i][j]["lid"] = schedules_list[i][j][4]
                    outdict[i][j]["honors"] = schedules_list[i][j][5] 
                    outdict[i][j]["location"] = schedules_list[i][j][6] 
                    outdict[i][j]["gened"] = schedules_list[i][j][7] 
                    outdict[i][j]["major"] = schedules_list[i][j][8] 
                    outdict[i][j]["prereqs"] = schedules_list[i][j][9] 
                    outdict[i][j]["time_of_day"] = schedules_list[i][j][10]
                    outdict[i][j]["type"] = schedules_list[i][j][11]

                #print(outdict[temp])
                
            with open('generated_schedules.txt', 'w') as outfile:
                json.dump(outdict, outfile)

            print("outputed schedule to generated_schedules.txt in json format")
            



            return schedules_list



                

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            conn.close()
            print("\nDatabase connection closed\n")

if __name__ == "__main__":
    generate("server/courses/output.json", 14, 18, 3)