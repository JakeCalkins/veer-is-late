// Basic setup for index
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Gathering all the components
import NavBar from './components/navbar/NavBar';
import StudentID from './components/student_id_container/StudentID';
import ProgressContainer from './components/progress_container/ProgressContainer';
import RequirementsContainer from './components/requirements_container/RequirementContainers';
import MenuItems from './components/MenuItems/MenuItems';
import Schedule from './components/schedule_generator/Schedule';
import Mercenaries from './components/ScheduleMercenaries/ScheduleMercenaries';
import DetailsPane from './components/DetailsPane/DetailsPane'

// Control visibility & state
let visibleView = (
    <div>
        <NavBar />
        <MenuItems />
        <Schedule />
        <RequirementsContainer />
        <StudentID />
    </div>
); //default state

let x = 2
if(x != 1) {
    visibleView = (
        <div>
            <NavBar />
            <StudentID />
        </div>
    );
}

// Render to the DOM
ReactDOM.render(visibleView, document.getElementById('root'));
