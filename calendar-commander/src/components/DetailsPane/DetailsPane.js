import React from 'react';
import './DetailsPane.css';
import '../timetable.js-master/dist';
import timetableStyles from '../timetable.js-master/dist/styles/timetablejs.css';
import timetableJS from '../timetable.js-master/dist/scripts/timetable';

class DetailsPane extends React.Component {
  render() {
    return (
      <div className="DetailsPane">
        <link rel="stylesheet" href={timetableStyles} />
        <script src={timetableJS}></script>
        <div class="timetable"></div>
      </div>
    );
  }
}

// Using TimetableJS
var timetable = new Timetable();
timetable.setScope(8, 21); // optional, only whole hours between 0 and 23
timetable.useTwelveHour(); //optional, displays hours in 12 hour format (1:00PM)

timetable.addLocations(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
// for(class in selected_schedule) { //obviously wont work yet
//     for(weekday in selected_schedule.class) {
//         let hours0 = selected_schedule.class.day.time[0].hours;
//         let minutes0 = selected_schedule.class.day.time[0].minutes;

//         let hours1 = selected_schedule.class.day.time[1].hours;
//         let minutes1 = selected_schedule.class.day.time[1].minutes;

//         timetable.addEvent(class.name, class.day, new Date(2019,12,8,hours0,minutes0), new Date(2019,12,8,hours1,minutes1)); // Y,M,D , HH,MM
//     }
// }

// var options = {
//     url: '#', // makes the event clickable
//     class: 'vip', // additional css class
//     data: { // each property will be added to the data-* attributes of the DOM node for this event
//       id: 4,
//       ticketType: 'VIP'
//     },
//     onClick: function(event, timetable, clickEvent) {} // custom click handler, which is passed the event object and full timetable as context  
//   };
//   timetable.addEvent('Jam Session', 'Nile', new Date(2015,7,17,21,15), new Date(2015,7,17,23,30), options);

var renderer = new Timetable.Renderer(timetable);
renderer.draw('.timetable'); // any css selector

export default DetailsPane;