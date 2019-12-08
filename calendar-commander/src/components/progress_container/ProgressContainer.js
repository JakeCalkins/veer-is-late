import React from 'react';
import './ProgressContainer.css';
import assemblingSchedules from './assemblingSchedules.png'

class ProgressContainer extends React.Component {
  render() {
      return (
      <div className="ProgressContainer">
        <div class="wrappist">
          <div class="header-text">
            <h2>Pulling your academic requirements report...</h2>
          </div>
          <img src={assemblingSchedules} alt="academic requirements splash image" class="illustration" />
          <div class="loader"></div>
          <div class="circles">
            <div class="circle" id="current-item"></div>
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressContainer;