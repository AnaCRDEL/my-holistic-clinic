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

    toDate = (date) => {
        return new Date(date);
    };

    formatDate = (date) => {
        const appointmentDate = this.toDate(date).toLocaleString('pt-BR')
        return appointmentDate
    };
    
    pastAppointments = (date) => {
        const now = new Date();
        const appointmentDate = this.toDate(date)
        return (+appointmentDate <= +now)
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
                <div className='div-page'>
                    <h2>Atendimentos Anteriores</h2>
                    <div className='div-buttons'> 
                        <NavLink to='/appointments'><button className='primary-button'> Voltar para Atendimentos </button></NavLink>
                    </div>
                    <div className='div-appointment-cards'> 
                        {this.state.appointments.map((appointment) => (
                            this.pastAppointments(appointment.dateTime) ? 
                            <div className='appointment-card'> 
                                <div cellSpacing='0' border='1' className='div-appointment'>
                                    <p className='professional-name'>{appointment.professional.name}</p>
                                    <p>Dia & Horário: <br></br>
                                    {this.formatDate(appointment.dateTime)}</p>
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