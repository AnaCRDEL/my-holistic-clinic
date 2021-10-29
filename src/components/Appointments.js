import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import AddAppointment from './AddAppointment';
import { NavLink } from 'react-router-dom';
const { Component } = require("react");

class Appointments extends Component {
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
                    <h2>Atendimentos</h2>
                    <div className='div-buttons'> 
                        <button className='primary-button' onClick={()=>{this.handleOnClick()}}> {this.state.addAppointment ? 'Cancelar' : 'Criar novo atendimento'}</button>
                        <NavLink to='/past-appointments'><button className='secondary-button'> Atendimentos realizados </button></NavLink>
                        {this.state.addAppointment === true ? 
                            <div>
                                <AddAppointment getAppointments={this.getAppointments}/>
                            </div> :
                            <div></div>
                        }
                    </div>
                    <div className='div-appointment-cards'> 
                        {this.state.appointments.map((appointment) => (
                            <div className='appointment-card' key={appointment._id}> 
                                <div cellSpacing='0' border='1' className='div-appointment'>
                                    <p className='professional-name'>{appointment.professional.name}</p>
                                    <p>Dia & Horário: <br></br>
                                    {this.formatDate(appointment.dateTime)}</p>
                                    <p>Paciente: <br></br>
                                    {appointment.patient.name}</p> 
                                </div>
                                <div>
                                    <NavLink className='appointment-details-link' to={`appointments/${appointment._id}`}>Ver detalhes</NavLink>
                                </div>
                            </div>
                            )
                        )}
                    </div>
                </div>
            </>
        )
    }
};

export default Appointments;