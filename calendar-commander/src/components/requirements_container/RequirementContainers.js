import React from 'react';
import "./RequirementsContainer.css"
import add_icon from "../MenuItems/addIcon.png"
import updateView from '../../index.js';

class RequirementsContainer extends React.Component {


  constructor(props){
    super(props);

    this.state = { 
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,

      honors: true,
      online: true,
      seminar: true
     }

      this.onClickButtonMonday = this.onClickButtonMonday.bind(this);
      this.onClickButtonTuesday = this.onClickButtonTuesday.bind(this);
      this.onClickButtonWednesday = this.onClickButtonWednesday.bind(this);
      this.onClickButtonThursday = this.onClickButtonThursday.bind(this);
      this.onClickButtonFriday = this.onClickButtonFriday.bind(this);

      this.onClickThesisButton = this.onClickThesisButton.bind(this);
      this.onClickOnlineButton = this.onClickOnlineButton.bind(this);
      this.onClickSeminarButton = this.onClickSeminarButton.bind(this);

  }

  onClickButtonMonday(event) {
    this.setState({monday: !this.state.monday});
    console.log(this.state.monday);
    var m = document.getElementsByClassName("day-type monday")[0]
    m.value = this.state.monday;
    if(this.state.monday){
      m.style.color = "white";
      m.style["border-color"] = "white";
      m.style["background-color"] = "#881c1c";
    } else {
      m.style.color = "black";
      m.style["border-color"] = "black";
      m.style["background-color"] = "white";
    }
  }

  onClickButtonTuesday(event) {
    this.setState({tuesday: !this.state.tuesday})
    console.log(this.state.tuesday);
    var m = document.getElementsByClassName("day-type tuesday")[0]
    m.value = this.state.tuesday;
    if(this.state.tuesday){
      m.style.color = "white";
      m.style["border-color"] = "white";
      m.style["background-color"] = "#881c1c";
    } else {
      m.style.color = "black";
      m.style["border-color"] = "black";
      m.style["background-color"] = "white";
    }
  }

  onClickButtonWednesday(event) {
    this.setState({wednesday: !this.state.wednesday})
    console.log(this.state.wednesday);
    var m = document.getElementsByClassName("day-type wednesday")[0]
    m.value = this.state.wednesday;
    if(this.state.wednesday){
      m.style.color = "white";
      m.style["border-color"] = "white";
      m.style["background-color"] = "#881c1c";
    } else {
      m.style.color = "black";
      m.style["border-color"] = "black";
      m.style["background-color"] = "white";
    }
  }

  onClickButtonThursday(event) {
    this.setState({thursday: !this.state.thursday})
    console.log(this.state.thursday);
    var m = document.getElementsByClassName("day-type thursday")[0]
    m.value = this.state.thursday;
    if(this.state.thursday){
      m.style.color = "white";
      m.style["border-color"] = "white";
      m.style["background-color"] = "#881c1c";
    } else {
      m.style.color = "black";
      m.style["border-color"] = "black";
      m.style["background-color"] = "white";
    }
  }

  onClickButtonFriday(event) {
    this.setState({friday: !this.state.friday})
    console.log(this.state.friday);
    var m = document.getElementsByClassName("day-type friday")[0]
    m.value = this.state.friday;
    if(this.state.friday){
      m.style.color = "white";
      m.style["border-color"] = "white";
      m.style["background-color"] = "#881c1c";
    } else {
      m.style.color = "black";
      m.style["border-color"] = "black";
      m.style["background-color"] = "white";
    }
  }

  onClickThesisButton(event){
    this.setState({honors: !this.state.honors})
    var m = document.getElementsByClassName("honors-selection")[0]
    m.value = this.state.honors;
    if(this.state.honors){
      m.style["background-color"] = "white"
    } else {
      m.style["background-color"] = "#881c1c";
    }
  }

  onClickOnlineButton(event){
    this.setState({online: !this.state.online})
    var m = document.getElementsByClassName("online-selection")[0]
    m.value = this.state.online;
    if(this.state.online){
      m.style["background-color"] = "white"
    } else {
      m.style["background-color"] = "#881c1c";
    }
  }

  onClickSeminarButton(event){
    this.setState({seminar: !this.state.seminar})
    var m = document.getElementsByClassName("independent-selection")[0]
    m.value = this.state.seminar;
    if(this.state.seminar){
      m.style["background-color"] = "white"
    } else {
      m.style["background-color"] = "#881c1c";
    }
  }

  render() {
    return (
      <div id="requirements-container">
        <div class="wrappist">
          <h1 class="title-header">List your personal requirements:</h1>
          <h4 class="sub-headers">How many credits do you want to take?</h4>
          <div class="credit-input-section">
            <input id="min-credit-input" type="number" min="0" max="24" placeholder="0"></input>
            <h2 class="divide"> to </h2>
            <input id="max-credit-input" type="number" min="0" max="24" placeholder="24"></input>
            <h2 class="divide"> credits </h2>
          </div>
          <h4 class="sub-headers">Days and Times</h4>
          <div id="time-requirements">
            <div class="day-selection">
              <p class="days-text">On these days: </p>
              <button class="day-type monday" value="false" onClick={this.onClickButtonMonday} >M</button>
              <button class="day-type tuesday" value="false" onClick={this.onClickButtonTuesday}>T</button>
              <button class="day-type wednesday" value="false" onClick={this.onClickButtonWednesday}>W</button>
              <button class="day-type thursday" value="false" onClick={this.onClickButtonThursday}>T</button>
              <button class="day-type friday" value="false" onClick={this.onClickButtonFriday}>F</button>
            </div>
            <div id="time-of-day-requirement">
              <p class="days-text">Avoid times</p>
              <button class="before-after-toggle">before</button>
              <input id="min-time-input" type="text" placeholder="12:30"></input>
              <div class="toggable-items-false">
                <p class="days-text">and</p>
                <input id="max-time-input" type="text" placeholder="16:30"></input>
            </div>
          </div>
          <div id="add-requirement-button">
              <button class="add-requirement">
                <img class="add-sign" src={add_icon} alt="plus sign"></img>
                <span class="requirement">Add new requirement to your list</span>
                </button>
            </div>
          </div>
          <div class="option-list">
            <div class="option">
              <button class="honors-selection" value="false" onClick={this.onClickThesisButton}></button>
              <h1>Honors thesis?</h1>
            </div>
            <div class="option">
              <button class="online-selection" value="false" onClick={this.onClickOnlineButton}></button>
              <h1>Online courses?</h1>
              <span class="side-option-false">
                <h1>How many maximum?</h1>
                <input class="online-input"></input>
              </span>
            </div>
            <div class="option">
              <button class="independent-selection" value="false" onClick={this.onClickSeminarButton}></button>
              <h1>Independent study?</h1>
              <span class="side-option-false">
                <h1>How many maximum?</h1>
                <input class="independent-input"></input>
              </span>
            </div>
          </div>
          <div class="input-options">
              <div class="input-opt">
                <p class="days-text">Preference in class size?</p>
                <button class="between-any-toggle">any</button>
                <div class="class-options-false">
                <input id="min-class-input" type="text" placeholder="50"></input>
                  <p class="days-text">and</p>
                  <input id="max-class-input" type="text" placeholder="100"></input>
              </div>
            </div>
            <div class="input-opt">
                <p class="days-text">Maximum number of in-major courses: </p>
                <input id="course-class-input" type="text" placeholder="5"></input>
            </div>
              <div class="input-opt">
                <p class="seminar-text">How many seminars? </p>
                <input id="seminar-class-input" type="text" placeholder="0"></input>
              </div>
          </div>
          <div class="forthebutton">
            <button id="generate" onClick={function() {

              var minCredits = document.getElementById("min-credit-input").value;
              var maxCredits = document.getElementById("max-credit-input").value;

              var monday = document.getElementsByClassName("monday")[0].value;
              var tuesday = document.getElementsByClassName("tuesday")[0].value;
              var wednesday = document.getElementsByClassName("wednesday")[0].value;
              var thursday = document.getElementsByClassName("thursday")[0].value;
              var friday = document.getElementsByClassName("friday")[0].value;

              var honors = document.getElementsByClassName("honors-selection")[0].value;
              var online = document.getElementsByClassName("online-selection")[0].value;
              var independent = document.getElementsByClassName("independent-selection")[0].value;

              var major_classes = document.getElementById("course-class-input").value;
              var seminar_classes = document.getElementById("seminar-class-input").value;

              var request = 'http://localhost:1337/api/test?mincredits='+minCredits+'&maxcredits=' + maxCredits
              + '&m=' + monday + '&t=' + tuesday + '&w=' + wednesday + '&th=' + thursday + '&f=' + friday + '&honors=' +
              honors + '&online=' + online + '&independent=' + independent + '&majclass=' + major_classes + '&sem=' + seminar_classes;

              console.log(request, "THIS IS A REQUEST");

              // HTTP request to run requirements builder
              var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
              var xhr = new XMLHttpRequest();
              console.log(maxCredits + "this is a value");
              xhr.open('GET', request, true);
              xhr.send(); 

              // HTTP request to run the schedule builder
              var xhr = new XMLHttpRequest();
              xhr.open('GET', "http://localhost:1337/api/schedule", true);
              xhr.send(); 
              updateView();
            //   var obj = {
            //     table: []
            //  };
            //  obj.table.push({min: minCredits, max: maxCredits});
            //  var json = JSON.stringify(obj);
            //  var fs = require('fs');
            //  fs.writeFile("../../../../server/courses/settings.json", json, 'utf8');
            }}>Generate!</button>
          </div>
          <div class="circles">
            <div class="circle"></div>
            <div class="circle" id="current-item" ></div>
            <div class="circle"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default RequirementsContainer;