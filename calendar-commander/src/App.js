import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <form action="/requirements-aquisiton.html">
        <h2>Enter your Student ID</h2>
        <input type="text" name="SID" placeholder="12345678" />
        <img src="calendar-commander/src/submit_triangle.png" />
        <button type="submit"></button>
      </form>
    </div>
  );
}

export default App;
