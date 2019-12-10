import psycopg2
import json
import re
import random


def conflicthelper(day, time1, time2):
    if day in time1 and day in time2:
            #print("found")
            time = re.compile("\d+")
            ampm = re.compile("[A-Z]+")
            fixedstartc = float(time.findall(time1)[0]) + (float(time.findall(time1)[1])/60.0)
            if(ampm.findall(time1)[-2] == "PM"):
                fixedstartc += 12.0
            fixedstart = float(time.findall(time2)[0]) + (float(time.findall(time2)[1])/60.0)
            if(ampm.findall(time2)[-2] == "PM"):
                fixedstart += 12.0
            fixedendc = float(time.findall(time1)[2]) + (float(time.findall(time1)[3])/60.0)
            if(ampm.findall(time1)[-1] == "PM"):
                fixedendc += 12.0
            fixedend = float(time.findall(time2)[2]) + (float(time.findall(time2)[3])/60.0)
            if(ampm.findall(time2)[-1] == "PM"):
                fixedend += 12.0

            if(max(fixedstart, fixedstartc) < min(fixedend, fixedendc)):
                #print("Conflict")
                return True
    return False
            


def check_conflicts(schedule_arr, newclass, islab):
    conflict = False
    if(islab):
        for c in schedule_arr:
            if(len(c) >8):
            #see if classes are on the same day
                print(c[10])
                if conflicthelper("M", c[10], newclass[3]):
                    conflict =  True

                if conflicthelper("TU", c[10], newclass[3]):
                    conflict =  True

                if conflicthelper("W", c[10], newclass[3]):
                    conflict =  True

                if conflicthelper("TH", c[10], newclass[3]):
                    conflict =  True

                if conflicthelper("F", c[10], newclass[3]):
                    conflict =  True
            else:
                print([c[3]])
                if conflicthelper("M", c[3], newclass[3]):
                    conflict =  True

                if conflicthelper("TU", c[3], newclass[3]):
                    conflict =  True

                if conflicthelper("W", c[3], newclass[3]):
                    conflict =  True

                if conflicthelper("TH", c[3], newclass[3]):
                    conflict =  True

                if conflicthelper("F", c[3], newclass[3]):
                    conflict =  True
            
    else:
        for c in schedule_arr:
            if(len(c) > 8):
            #see if classes are on the same day
                print(c[10])
                if conflicthelper("M", c[10], newclass[10]):
                    conflict =  True

                if conflicthelper("TU", c[10], newclass[10]):
                    conflict =  True

                if conflicthelper("W", c[10], newclass[10]):
                    conflict =  True

                if conflicthelper("TH", c[10], newclass[10]):
                    conflict =  True

                if conflicthelper("F", c[10], newclass[10]):
                    conflict =  True
            else:
                print(c[3])
                if conflicthelper("M", c[3], newclass[10]):
                    conflict =  True

                if conflicthelper("TU", c[3], newclass[10]):
                    conflict =  True

                if conflicthelper("W", c[3], newclass[10]):
                    conflict =  True

                if conflicthelper("TH", c[3], newclass[10]):
                    conflict =  True

                if conflicthelper("F", c[3], newclass[10]):
                    conflict =  True
            
    return conflict

def generate(arr_dir, settings_dir, num_schedules):
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


        with open(settings_dir) as json_settings:
            settings = json.load(json_settings)


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
                if(check_conflicts(schedule_req, i, False)):
                    print("Couldn't build schedule with required classes")
                    return -1
                else:
                    if((credits_added + i[2]) > settings["max_credits"]):
                        print("Required classes have too many credits")
                        return -1
                    else:
                        print(i)
                        schedule_req.append(i)
                        if(i[4] != None):
                            lid = str(i[4])
                            cur.execute("SELECT * FROM labs WHERE lid = %s", (lid,))
                            lab_results = cur.fetchall()
                            #print(lab_results)
                            lab_addded = False
                            for j in  lab_results:
                                if(check_conflicts(schedule_req, j, True) == False):
                                    schedule_req.append(j)
                                    lab_addded = True
                                    break
                            if(lab_addded == False):
                                print("Couldn't fit lab in reqired schedule")
                                return -1
                        credits_added += i[2]
            
            print(schedule_req)

            #add schedule if it already has required credits
            if(credits_added > settings["min_credits"]):
                schedules.append(schedule_req)
                num_generated += 1

            already_added_courses = []

            schedules_list = []

            for i in range(num_schedules):
                gened = random.choice(data["geneds"])
                print(gened)
                new_sched = schedule_req[:]
                new_creds = credits_added
                while(new_creds < settings["min_credits"]):
                    query_val = "%" + str(*gened) + "%"
                    cur.execute("SELECT * FROM courses WHERE gened LIKE %s and cnum like %s ORDER BY cnum", (query_val,"1%"))
                    results = cur.fetchall()
                    if(len(results) > 0):
                        newclass = random.choice(results)
                        print(new_sched)
                        print(newclass)
                        if((check_conflicts(new_sched, newclass, False) == False) and (newclass[1] not in already_added_courses)):
                            new_sched.append(newclass)
                            new_creds += newclass[2]
                            already_added_courses.append(newclass)
                            if(newclass[4] != None):
                                lid = str(newclass[4])
                                cur.execute("SELECT * FROM labs WHERE lid = %s", (lid,))
                                lab_results = cur.fetchall()
                                #print(lab_results)
                                lab_addded = False
                                for j in lab_results:
                                    if(check_conflicts(new_sched, j, True) == False):
                                        new_sched.append(j)
                                        lab_addded = True
                                        break
                                if(lab_addded == False):
                                    new_sched.remove(newclass)
                                    new_creds -= newclass[2]
                                    already_added_courses.remove(newclass)

                            
                schedules_list.append(new_sched)
            

            #Write output to a json file
            outdict = {}
            for i in range(num_schedules):
                #print(schedules_list[i])
                outdict[i] = {}
                for j in range(len(schedules_list[i])):
                    outdict[i][j] = {}
                    if(len(schedules_list[i][j]) > 8):
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
                    else:
                        outdict[i][j]["cnum"] = schedules_list[i][j][0]
                        outdict[i][j]["major"] = schedules_list[i][j][1] 
                        outdict[i][j]["cname"] = schedules_list[i][j][2] 
                        outdict[i][j]["time_of_day"] = schedules_list[i][j][3]
                        outdict[i][j]["type"] = schedules_list[i][j][4]
                        outdict[i][j]["lid"] = schedules_list[i][j][5]
                        
                        

                #print(outdict[temp])
                
            with open('generated_schedules.json', 'w') as outfile:
                json.dump(outdict, outfile)

            print("outputed schedule to generated_schedules.json in json format")
            



            return schedules_list



                

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            conn.close()
            print("\nDatabase connection closed\n")

if __name__ == "__main__":
    generate("server/courses/output.json", "server/courses/settings.json", 4)