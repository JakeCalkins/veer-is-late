import React from 'react';
import './App.css';
import submit_button from "./submit_triangle.png";
import calendar_icon from './calendar_icon.png';

function App() {
  return (
    <div className="App">
      <div id="navbar"> <!-- TODO TURN INTO COMPONENT -->
        <h1>Calendar Commander</h1>
        <img src="./calendar-commander/src/calendar_icon.png" />
        <div class="loader"></div>
      </div>
    </div>
  );
}

export default App;