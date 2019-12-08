import React from 'react';
import './App.css';
import calendar_icon from './calendar_icon.png';

function App() {
  return (
    <div className="App">
      <div id="navbar"> <!-- TODO TURN INTO COMPONENT -->
        <h1>Calendar Commander</h1>
        <figure class="recolor"><img src="./calendar-commander/src/calendar_icon.png" /></figure>
        <div class="menu">
          <div class="menu" id="menu-item">
            <figure class="recolor"><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn0.iconfinder.com%2Fdata%2Ficons%2Ftypicons-2%2F24%2Farrow-back-512.png&f=1&nofb=1" /></figure>
            <h3>Back to SPIRE</h3>
          </div>
          <div class="menu" id="menu-item">
            <figure class="recolor"><img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.endlessicons.com%2Fwp-content%2Fuploads%2F2014%2F03%2Fbookmark-icon-3.png&f=1&nofb=1" /></figure>
            <h3>Saved Schedules</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;