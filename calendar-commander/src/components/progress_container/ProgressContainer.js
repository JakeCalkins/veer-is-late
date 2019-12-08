import React from 'react';
import './ProgressContainer.css';

class ProgressContainer extends React.Component {
  render() {
      return (
      <div className="ProgressContainer">
        <h2>Pulling your academic requirements report...</h2>
        <img src="" alt="academic requirements splash image" />
        <div class="loader"></div>
        <div class="circles">
          <div class="circle" id="current-item"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </div>
    );
  }
}

export default ProgressContainer;