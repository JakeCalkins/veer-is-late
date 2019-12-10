import React from 'react';
import './ScheduleMercenaries.css'
import online from "./online.png"
import study from "./study.png"
import seminar from "./seminar.png"


class Mercenaries extends React.Component {

    mouseIn(){
        
    }

 render() {
    return (
      <div className = "Mercenaries">
          <div class="course-details" id="course-details-container">
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
                    <img alt="online"src={online}></img>
                    <img alt="study"src={study}></img>
                    <img alt="seminar"src={seminar}></img>
                </div>
                <div class="vl">
                </div>
                <div class="course-classes">
                    <ul class="col col1">
                        <li class="num1">RIC 556</li>
                        <li class="num4">CS 344</li>
                        <li class="num7">PB 523</li>
                    </ul>
                    <ul class="col col2">
                        <li class="num2">CNA 321</li>
                        <li class="num5"></li>
                        <li class="num8"></li>
                    </ul>
                    <ul class="col col3">
                        <li class="num3">MS 203</li>
                        <li class="num6"></li>
                        <li class="num9"></li>
                    </ul>
                    </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Mercenaries;