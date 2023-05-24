import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import NavBar from "./components/navbar/navbar";
import StudentID from "./components/student_id_container/StudentID";
import ProgressContainer from "./components/progress_container/ProgressContainer";
import RequirementsContainer from "./components/requirements_container/RequirementContainers";
import Schedule from "./components/schedule_generator/Schedule";
import MenuItems from "./components/MenuItems/MenuItems";

// ReactDOM.render(<div><NavBar /> <MenuItems/><Schedule /></div>, document.getElementById('root'));
 ReactDOM.render(<div><NavBar /> <StudentID/></div>, document.getElementById('root'));

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
if(x !== 1) {
    visibleView = (
        <div>
            <NavBar />
            <StudentID />
        </div>
    );
}

let updateView = function() {
    x++;
    if( x=== 3){
        visibleView = (
            <div>
                <NavBar />
                <ProgressContainer />
            </div>
        )
    }
    if (x === 4) {
        visibleView = (
            <div>
                <NavBar />
                <RequirementsContainer />
            </div>
        );
    }
    if (x === 5) {
        visibleView = (
            <div>
                <NavBar />
                <MenuItems />
                <Schedule />
            </div>
        );
    }
    // Render to the DOM
ReactDOM.render(visibleView, document.getElementById('root'));
}

export default updateView;