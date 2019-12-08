import React from 'react';
import "./RequirementsContainer.css"
import add_icon from "../menu_items/addIcon.png"

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
        </div>
      </div>
    );
  }
}

export default RequirementsContainer;