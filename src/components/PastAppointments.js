import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
const { Component } = require("react");

class PastAppointments extends Component {
    state = {
        appointments: [],
        addAppointment: false
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

    componentDidMount = async () => {
        this.getAppointments();
    };

    handleOnClick = () => {
        this.setState({
            addAppointment: !this.state.addAppointment  
        });
    };

    render() {
        return(
            <>
                <div>
                    <Navbar/>
                </div>
                <div className='appointments-page'>
                    <h2>Atendimentos Realizados</h2>
                    <div className='div-appointment-cards'> 
                        {this.state.appointments.map((appointment) => (
                            this.formatDate(appointment.date) < this.formatDate(new Date()) ? 
                            <div className='appointment-card'> 
                                <div cellSpacing='0' border='1' className='div-appointment'>
                                    <p className='professional-name'>{appointment.professional.name}</p>
                                    <p>Dia: {this.formatDate(appointment.date)}</p>
                                    <p>Horário: {appointment.time}</p>
                                    <p>Paciente: {appointment.patient.name}</p>
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

export default PastAppointments;