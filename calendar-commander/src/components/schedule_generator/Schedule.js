import React from 'react';
import './Schedule.css';
// import ScheduleMercenaries from './components/ScheduleMercenaries/ScheduleMercenaries';

class Schedule extends React.Component {
  render() {
    return (
      <div className="Schedule">
        <div class="schedule-wrappist">
          <h2 class="schedule-header">Generated Schedules (X results)</h2>
          <div class="schedule-list">
            <span id="for number of schedules in scheduleJSON:
             render a <ScheduleMercenaries /> for each one">Check the span ID attribute for the pseudocode of what I wanna do.</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Schedule;