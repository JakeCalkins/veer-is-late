import React from 'react';
import './DetailsPane.css';
import Timetable from 'react-timetable-events';
import moment from 'moment';

class DetailsPane extends React.Component {
  constructor(props){
    super();
    this.state = {
      events: {
        monday: [
          {
            id: 1,
            name: 'Custom Event 1',
            type: 'custom',
            startTime: moment('2018-02-23T11:30:00'),
            endTime: moment('2018-02-23T13:30:00')
          }
        ],
        tuesday: [
          {
            id: 2,
            name: 'Custom Event 2',
            type: 'custom',
            startTime: moment('2018-02-22T12:30:00'),
            endTime: moment('2018-02-22T14:30:00')
          },
          {
            id: 3,
            name: 'Custom Event 3',
            type: 'custom',
            startTime: moment('2018-02-22T16:30:00'),
            endTime: moment('2018-02-22T18:45:00')
          }
        ],
        wednesday: [],
        thursday: [],
        friday: []
      }
    }
  }
  render() {
    return (
      <div className="DetailsPane">
          <div class="pane">
            <div class="i-hate-this-module">
                <Timetable id="timetable-table-of-time" events={this.state.events}/>
            </div>
            <div class="course-info-panel">
              <div class="detail-view">
                  <h2>Courses</h2>
                  <h3>18 credits | 4 courses</h3>
                  </div>

                  <div id="course-list">
                      <table class="course-listings">
                        <tr>
                          <th id="detail-cnum"></th>
                          <th id="detail-ctitle"></th>
                          <th id="detail-cinstruct"></th>
                          <th id="detail-ccredit"></th>
                        </tr>
                        <tr>
                          <td class="course-num">CS 101</td>
                          <td class="course-title">Introduction to Computer Science</td>
                          <td class="course-instructor">Tim Richards</td>
                          <td class="course-credits">3 Credits</td>
                        </tr>
                        <tr>
                        <td class="course-num">CS250</td>
                          <td class="course-title">Theory in Computational Mathematics</td>
                          <td class="course-instructor">David Barrington</td>
                          <td class="course-credits">3 Credits</td>
                        </tr>
                        <tr>
                          <td class="course-num">CS101</td>
                          <td class="course-title">Introduction to Computers</td>
                          <td class="course-instructor">Tim Richards</td>
                          <td class="course-credits">3 credits</td>
                        </tr>
                      </table>
                  </div>
                </div>
        </div>
      </div>
    );
  }
}


export default DetailsPane;