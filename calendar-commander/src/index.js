import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import StudentID from "./components/student_id_container/StudentID"
import NavBar from "./components/navbar/NavBar"
import ProgressContainer from "./components/progress_container/ProgressContainer"

ReactDOM.render(<NavBar />, document.getElementById('root'));
console.log(StudentID)

// NOTE: removed service worker for the MVP