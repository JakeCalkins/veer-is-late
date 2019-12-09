import React from 'react';
import './StudentID.css';
import submit_button from './submit_triangle.png';
import updateView from '../../index.js';

class StudentID extends React.Component {
  render() {
      return (
      <div className="StudentID">
        <div class="wrappist">
        <div class="header-text"><h2>Enter your Student ID</h2></div>
        <form action="/requirements-aquisiton.html">
          <input type="text" name="SID" placeholder="8 digits" pattern="^[0-9]*$" maxLength="8"/>
          <button type="submit"><img src={submit_button} onClick={function() {
            var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xhr = new XMLHttpRequest();
            var sid = document.getElementsByTagName("input")[0].value;
            xhr.open('GET', 'http://localhost:1337/api/academic?sid=' + sid, true);
            xhr.send();
            updateView();
          }}/></button>
        </form>
      </div>
    </div>
    );
  }
}



export default StudentID;