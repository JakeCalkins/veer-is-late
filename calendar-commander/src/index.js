import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import ProgressContainer from "./components/progress_container/ProgressContainer"
import NavBar from "./components/navbar/NavBar"

ReactDOM.render(<div><NavBar /><ProgressContainer /></div>, document.getElementById('root'));