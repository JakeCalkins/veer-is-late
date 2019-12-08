import React from 'react';
import "./RequirementsContainer.css"

class RequirementsContainer extends React.Component {
  render() {
    return (
      <div id="requirements-container">
        <div class="wrappist">
          <h1 class="title-header">List your personal requirements:</h1>
          <h4 class="sub-headers">How many credits do you want to take?</h4>
          <div class="credit-input-section">
            <input id="min-credit-input" type="number" min="0" placeholder="0"></input>
            <h2 class="divide"> to </h2>
            <input id="max-credit-input" type="number" max="24"placeholder="24"></input>
            <h2 class="divide"> credits </h2>
          </div>
          <h4 class="sub-headers">Days and Times</h4>
        </div>
      </div>
    );
  }
}

export default RequirementsContainer;