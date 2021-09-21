import React from 'react';
import './Schedule.css';
import Mercenaries from '../ScheduleMercenaries/ScheduleMercenaries'
// import ScheduleMercenaries from './components/ScheduleMercenaries/ScheduleMercenaries';
import DetailsPane from "../DetailsPane/DetailsPane"
import output from "./output.js"
import ReactDOM from 'react-dom'

class Schedule extends React.Component {
  componentDidMount() {

      var mercs = document.getElementsByClassName("Mercenaries");

      var jsonObject = JSON.parse(output);
      for (var schedule in jsonObject) {
        console. log("Schedule: " + (parseInt(schedule) + 1));
        var totalCredits = 0;
        var totalClasses = 0;
        if (jsonObject.hasOwnProperty(schedule)) {
          var val = jsonObject[schedule];
          for (var course_count in val) {
            var course = val[course_count]
            var cnum = course["cnum"];
            var major = course["major"];
            totalCredits = totalCredits + parseInt(course["credits"]);
            totalClasses++;
          
            var colplease = mercs[schedule].getElementsByClassName("num" + (parseInt(course_count) + 1))[0];
            colplease.innerHTML = major + " " + cnum;


          }
        }

        var ccount = mercs[schedule].getElementsByClassName("credit-count")[0];
        ccount.innerHTML = totalCredits + " credits";

        var class_count = mercs[schedule].getElementsByClassName("class-count")[0];
        var change_count = class_count.getElementsByClassName("num")[0];
        change_count.innerHTML = totalClasses;

        var major_count = mercs[schedule].getElementsByClassName("major-count")[0];
        var major_change_count = major_count.getElementsByClassName("num")[0];
        major_change_count.innerHTML = totalClasses - 2;

        var other_count = mercs[schedule].getElementsByClassName("other-count")[0];
        var other_change_count = other_count.getElementsByClassName("num")[0];
        other_change_count.innerHTML = 2;
       
  }
}



  render() {
    return (
      <div className="Schedule">
        <div class="schedule-wrappist" id="schedule-container">
          <h2 class="schedule-header">Generated Schedules (X results)</h2>
          <div class="schedule-list">
            <Mercenaries></Mercenaries>
            <Mercenaries></Mercenaries>
            <Mercenaries></Mercenaries>
            <Mercenaries></Mercenaries>
          </div>
          <div class="calender-contain">
            <DetailsPane></DetailsPane>
          </div>
          
        </div>
      </div>
      
    );
  }
}

export default Schedule;