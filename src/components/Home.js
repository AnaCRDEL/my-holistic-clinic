import React from 'react';
import { Component } from "react";
import { NavLink } from 'react-router-dom';
import api from '../utils/api.utils';
import Navbar from './Navbar';

class Home extends Component {
    state = {
        appointments: [],
    };

    getAppointments = async () => {
        const response = await api.getAppointments();
        this.setState({
            appointments: response.data
        })
    }

    formatDate = (date) => {
        const appointmentDate = new Date(date).toLocaleDateString('br', {timeZone: 'UTC'})
        return appointmentDate
    };

    weekAppointments = (date) => {
        const today = new Date();
        const seventhDay = new Date();
        seventhDay.setDate(seventhDay.getDate() + 7);
        const getDate = this.formatDate(date);
        console.log(getDate, today, this.formatDate(seventhDay))
        if (getDate >= today) {
            return true
        } else {
            return console.log(false)
        }
    };

    componentDidMount = async () => {
        this.getAppointments();
    };

    render() {
        return(
            <>
                <div>
                    <Navbar/>
                </div>
                <div className='home-page'>
                    <h3>Atendimentos essa semana:</h3>
                    <div className='div-appointment-cards'> 
                        {this.state.appointments.map((appointment) => (
                            this.weekAppointments(appointment.date) ? 
                            <div className='appointment-card' key={appointment._id}> 
                                <div cellSpacing='0' border='1' className='div-appointment'>
                                    <p className='professional-name'>{appointment.professional.name}</p>
                                    <p>Dia: {this.formatDate(appointment.date)}</p>
                                    <p>Horário: {appointment.time}</p>
                                    <p>Paciente: <br></br>
                                    {appointment.patient.name}</p> 
                                </div>
                                <div>
                                    <NavLink className='appointment-details-link' to={`appointments/${appointment._id}`}>Ver detalhes</NavLink>
                                </div>
                            </div>
                            : null
                            ) 
                        )}
                    </div>
                </div>
            </>
        )
    }
};

export default Home;