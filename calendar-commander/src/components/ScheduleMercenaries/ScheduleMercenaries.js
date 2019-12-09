import React from 'react';
import './ScheduleMercenaries.css'
import online from "./online.png"
import study from "./study.png"
import seminar from "./seminar.png"


class Mercenaries extends React.Component {
 render() {
    return (
      <div className = "Mercenaries">
          <div class="course-details">
            <div class="course-header">
                <h1 class="credit-count">15 credits</h1>
                <h1 class="class-count">
                <span class="num">5</span> classes</h1>
                <h1 class="major-count">
                <span class="num">2</span> in-major</h1>
                <h1 class="other-count">
                    <span class="num">3</span> non-major</h1>
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
                        <li>RIC 556</li>
                        <li>CS 344</li>
                        <li>PB 523</li>
                    </ul>
                    <ul class="col col2">
                        <li>CNA 321</li>
                    </ul>
                    <ul class="col col3">
                        <li>MS 203</li>
                    </ul>
                    </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Mercenaries;