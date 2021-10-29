import React from 'react';
import { Component } from "react";
import { NavLink } from 'react-router-dom';
import api from '../utils/api.utils';
import Navbar from './Navbar';
import AddAppointment from './AddAppointment';
import AddPatient from './AddPatient';

class Home extends Component {
    state = {
        appointments: [],
        addPatient: false,
        addAppointment: false
    };

    getAppointments = async () => {
        const response = await api.getAppointments();
        this.setState({
            appointments: response.data
        })
    };

    getPatients = async () => {
        const response = await api.getPatients();
        this.setState({
            patients: response.data
        })
    };
    
    toDate = (date) => {
        return new Date(date);
    };

    formatDate = (date) => {
        const appointmentDate = this.toDate(date).toLocaleString('pt-BR')
        return appointmentDate
    };

    weekAppointments = (date) => {
        const now = new Date();
        let sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(now.getDate() + 7);
        const appointmentDate = this.toDate(date)
        return (+appointmentDate >= +now && +appointmentDate <= +sevenDaysFromNow)
    };

    componentDidMount = async () => {
        this.getAppointments();
    };

    handleOnClickAppointment = () => {
        this.setState({
            addAppointment: !this.state.addAppointment  
        });
    };

    handleOnClickPatient = () => {
        this.setState({
            addPatient: !this.state.addPatient  
        });
    };

    render() {
        return(
            <>
                <div>
                    <Navbar/>
                </div>
                <div className='div-page'>
                    <div className='div-buttons'>
                        <button className='primary-button' onClick={()=>{this.handleOnClickPatient()}}> {this.state.addPatient ? 'Cancelar' : 'Cadastrar novo paciente'}</button>
                        <button className='primary-button' onClick={()=>{this.handleOnClickAppointment()}}> {this.state.addAppointment ? 'Cancelar' : 'Criar novo atendimento'}</button>
                    {this.state.addPatient === true ? 
                        <div>
                            <AddPatient getPatients={this.getPatients}/>
                        </div> :
                        <div></div>
                        }
                        {this.state.addAppointment === true ? 
                        <div>
                            <AddAppointment getAppointments={this.getAppointments}/>
                        </div> :
                        <div></div>
                        }                    
                    </div>
                    <h2>Atendimentos essa semana:</h2>
                    <div className='div-appointment-cards'> 
                        {this.state.appointments.map((appointment) => (
                            this.weekAppointments(appointment.dateTime) ? 
                            <div className='appointment-card' key={appointment._id}> 
                                <div className='div-appointment'>
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