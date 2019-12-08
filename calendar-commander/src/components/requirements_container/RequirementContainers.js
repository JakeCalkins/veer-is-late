import React from 'react';
import "./RequirementsContainer.css"
import add_icon from "../MenuItems/addIcon.png"

class RequirementsContainer extends React.Component {
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
              <button class="day-type">M</button>
              <button class="day-type">T</button>
              <button class="day-type">W</button>
              <button class="day-type">T</button>
              <button class="day-type">F</button>
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
              <button class="honors-selection"></button>
              <h1>Honors thesis?</h1>
            </div>
            <div class="option">
              <button class="online-selection"></button>
              <h1>Online courses?</h1>
              <span class="side-option-false">
                <h1>How many maximum?</h1>
                <input class="online-input"></input>
              </span>
            </div>
            <div class="option">
              <button class="independent-selection"></button>
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
            <button id="generate">Generate!</button>
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