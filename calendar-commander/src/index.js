import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import StudentID from "./components/student_id_container/StudentID"
import NavBar from "./components/navbar/NavBar"
import RequirementsContainer from "./components/requirements_container/RequirementContainers"

ReactDOM.render(<div><NavBar /> <StudentID /></div>, document.getElementById('root'));