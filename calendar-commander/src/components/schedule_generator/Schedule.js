import React from 'react';
import './Schedule.css';
import Mercenaries from '../ScheduleMercenaries/ScheduleMercenaries'
// import ScheduleMercenaries from './components/ScheduleMercenaries/ScheduleMercenaries';
import DetailsPane from "../DetailsPane/DetailsPane"
import arrow from "./detailSelector.png"

class Schedule extends React.Component {
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