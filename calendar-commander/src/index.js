import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import NavBar from "./components/navbar/NavBar";
import StudentID from "./components/student_id_container/StudentID";
import ProgressContainer from "./components/progress_container/ProgressContainer";
import RequirementsContainer from "./components/requirements_container/RequirementContainers";
import Schedule from "./components/schedule_generator/Schedule";
import MenuItems from "./components/MenuItems/MenuItems";
import Mercenaries from './components/ScheduleMercenaries/ScheduleMercenaries';
import DetailsPane from './components/DetailsPane/DetailsPane'

// ReactDOM.render(<div><NavBar /> <MenuItems/><Schedule /></div>, document.getElementById('root'));
ReactDOM.render(<div><NavBar /> <StudentID/></div>, document.getElementById('root'));
