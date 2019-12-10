import React from 'react';
import './Schedule.css';
// import Mercenaries from '../ScheduleMercenaries/ScheduleMercenaries'
// import ScheduleMercenaries from './components/ScheduleMercenaries/ScheduleMercenaries';
import DetailsPane from "../DetailsPane/DetailsPane"
import arrow from "./detailSelector.png"
import online from "./online.png"
import study from "./study.png"
import seminar from "./seminar.png"
import schedulesJSON from '../../../../generated_schedules.json';

class Schedule extends React.Component {
  render() {
    let mercList = [];
    for(scheduleNumber in schedulesJSON) {
      mercList.push(<Mercenaries scheduleNumber={scheduleNumber} />);
    }
    return (
      <div className="Schedule">
        <div class="schedule-wrappist" id="schedule-container">
          <h2 class="schedule-header">Generated Schedules ({schedulesJSON.length} results)</h2>
          <div class="schedule-list">
            { mercList }
          </div>
          <div class="calender-contain">
            <DetailsPane />
          </div>
        </div>
      </div>
    );
  }
}

function Mercenaries(props) {
  const data = schedulesJSON[props.scheduleNumber];
  const listItems = data.map((c) => <li>{c.cname}</li>);
  for(item in listItems) {
    if(item < 3) {
        classListColumn1.push(listItems[item]);
    } else if(item < 6 && item >= 3) {
        classListColumn2.push(listItems[item]);
    } else if(item < 9 && item >= 6) {
        classListColumn2.push(listItems[item]);
    } else {}
  }

  let credits = 0;
  let numClasses= 0;
  let inMajor = 0;
  let outMajor = 0;

  //totals
  for(classes in data) {
    credits += data[classes].credits;
    classes ++;
    if(data[classes].major === "COMPSCI") {
      credits += data[classes].credits;
    } else {
      credits += data[classes].credits;
    }
  }

  return (
    <div className = "Mercenaries">
        <div class="course-details" id="course-details-container">
          <div class="course-header">
              <h1 class="credit-count">{credits} credits</h1>
              <h1 class="class-count">
              <span class="num">{numClasses}</span> classes</h1>
              <h1 class="major-count">
              <span class="num">{inMajor}</span> in-major</h1>
              <h1 class="other-count">
                  <span class="num">{outMajor}</span> non-major</h1>
          </div>
          <hr class="breaker"/>
          <div class="course-body">
              <div class="course-icons">
                  <img src={online}></img>
                  <img src={study}></img>
                  <img src={seminar}></img>
              </div>
              <div class="vl">
              </div>
              <div class="course-classes">
                  <ul class="col col1">
                      { classListColumn1 }
                  </ul>
                  <ul class="col col2">
                      { classListColumn2 }
                  </ul>
                  <ul class="col col3">
                      { classListColumn3 }
                  </ul>
                  </div>
          </div>
        </div>
    </div>
  );
}

export default Schedule;