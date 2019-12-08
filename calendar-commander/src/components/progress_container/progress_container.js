import React from 'react';
import './App.css';
import submit_button from "./submit_triangle.png";
import calendar_icon from './calendar_icon.png';

function App() {
  return (
    <div className="App">
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

export default App;