var db = require('./database/db')

db.executeQuery("Select cname, cnum from course", null);
db.executeQuery("Select first_name from student where sid = $1", [1]);