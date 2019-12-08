import React from 'react';
import './NavBar.css';
import calendar_icon from './calendar.png';
import back_logo from './backLogo.png';
import saved_icon from './savedIcon.png';

class NavBar extends React.Component {
 render() {
    return (
      <div className="NavBar">
        <div id="navbar">
          <div class="menu">
            <div id = "title-header">
              <h1>Calendar Commander</h1>
            </div>
            <div class="img">
              <img class = "calendar" src={calendar_icon} />
            </div>
            <div id="spire-return">
              <img src={back_logo} alt="go back"/>
              <h3>Back to SPIRE</h3>
            </div>
            <div id="saved-schedules" >
              <img src={saved_icon} alt="saved schedules"></img>
              <h3>Saved Schedules</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;