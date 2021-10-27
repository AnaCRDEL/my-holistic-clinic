import './App.css';
import React from 'react'
import { Route } from 'react-router';

import Login from './components/public/Login';
import Professionals from './components/Professionals';
import Home from './components/Home';
import Patients from './components/Patients';
import Appointments from './components/Appointments';
import PublicHome from './components/public/Home'
import PatientDetails from './components/PatientDetails';
import ProfessionalDetails from './components/ProfessionalDetails';
import AppointmentDetails from './components/AppointmentDetails';
import NonActivePatients from './components/NonActivePatients';
import PastAppointments from './components/PastAppointments';


function App() {
  return (
    <div className="App">
      <Route exact path='/' component={PublicHome}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/login' render= {(props) => <Login {...props}/> }/>
      <Route exact path='/professionals' component={Professionals}/>
      <Route exact path='/patients' component={Patients}/>
      <Route exact path='/patients/:id' component={PatientDetails}/>
      <Route exact path='/professionals/:id' component={ProfessionalDetails}/>
      <Route exact path='/appointments' component={Appointments}/>
      <Route exact path='/appointments/:id' component={AppointmentDetails}/>
      <Route exact path='/non-active-patients' component={NonActivePatients}/>
      <Route exact path='/past-appointments' component={PastAppointments}/>
    </div>
  );
}

export default App;