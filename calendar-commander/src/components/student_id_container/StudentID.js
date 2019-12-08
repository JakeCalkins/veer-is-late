import React from 'react';
import './StudentID.css';
import submit_button from './submit_triangle.png';

class StudentID extends React.Component {
  render() {
      return (
      <div className="StudentID">
        <div class="wrappist">
        <div class="header-text"><h2>Enter your Student ID</h2></div>
        <form action="/requirements-aquisiton.html">
          <input type="text" name="SID" placeholder="8 digits" pattern="^[0-9]*$" maxLength="8"/>
          <button type="submit"><img src={submit_button} /></button>
        </form>
      </div>
    </div>
    );
  }
}



export default StudentID;