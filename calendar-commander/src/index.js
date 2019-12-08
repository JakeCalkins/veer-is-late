import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import ProgressContainer from "./components/progress_container/ProgressContainer"
import NavBar from "./components/navbar/NavBar"
import RequirementsContainer from "./components/requirements_container/RequirementContainers"

ReactDOM.render(<div><NavBar /> <RequirementsContainer /></div>, document.getElementById('root'));