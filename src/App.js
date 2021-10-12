import './App.css';
import React from 'react'
import { Route } from 'react-router';

import Login from './components/Login';
import Professionals from './components/Professionals';
import Home from './components/Home';
import Signup from './components/Signup';
import Patients from './components/Patients';
import Appointments from './components/Appointments';


function App() {
  return (
    <div className="App">
      <Route exact path='/home' component={Home}/>
      <Route exact path='/login' render= {(props) => <Login {...props}/> }/>
      <Route exact path='/signup' render= {(props) => <Signup {...props}/> }/>
      <Route exact path='/professionals' component={Professionals}/>
      <Route exact path='/patients' component={Patients}/>
      <Route exact path='/appointments' component={Appointments}/>
    </div>
  );
}

export default App;