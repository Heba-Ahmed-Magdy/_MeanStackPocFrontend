import React from 'react';
import './App.css';
import Header from './Components/Header'
import {Router} from '@reach/router';
import CreateEmployee from './Components/CreateEmployee'
import Employees from './Components/Employees'

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>
            <Employees      path="/get"></Employees>
            <CreateEmployee path="/create" ></CreateEmployee>
      </Router>
    </div>
  );
}

export default App;
