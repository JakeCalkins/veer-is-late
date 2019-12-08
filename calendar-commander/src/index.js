import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import StudentID from "./components/student_id_container/StudentID"

ReactDOM.render(<StudentID />, document.getElementById('root'));
console.log(StudentID)

// NOTE: removed service worker for the MVP