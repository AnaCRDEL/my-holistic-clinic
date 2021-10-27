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

    componentDidMount = async () => {
        this.getAppointments();
    };

    render() {
        console.log(new Date().getDate() + 7)
        return(
            <>
                <div>
                    <Navbar/>
                </div>
                <div>
                    <h3>Atendimentos essa semana:</h3>
                    <table cellSpacing='0' border='1' className='div-table'>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Profissional</th>
                                <th>Paciente</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.appointments.map((appointment) => (
                                this.formatDate(appointment.date) >= this.formatDate(new Date()) && this.formatDate(appointment.date) < (this.formatDate(new Date().getDate() + 7)) ? 
                                <tr key={appointment._id}>
                                    <td><NavLink to={`appointments/${appointment._id}`}>{this.formatDate(appointment.date)}</NavLink></td>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.professional.name}</td>
                                    <td>{appointment.patient.name}</td>
                                </tr>
                                : null 
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
};

export default Home;