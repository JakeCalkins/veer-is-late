import React from 'react';
import './ProgressContainer.css';
import assemblingSchedules from './assemblingSchedules.png'
import updateView from '../../index.js';

class ProgressContainer extends React.Component {

  beginLoading() {
    setTimeout(function () {
        updateView();
    }, 5000);
}

  render() {
      return (
      <div className="ProgressContainer">
        <div class="wrappist" id="progress-container">
          <div class="header-text">
            <h2>Pulling your academic requirements report...</h2>
          </div>
          <img src={assemblingSchedules} alt="academic requirements splash" class="illustration" />
          <div class="loader"></div>
          <div class="circles">
            <div class="circle" id="current-item"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            {this.beginLoading()}
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressContainer;