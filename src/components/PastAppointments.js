import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import AddAppointment from './AddAppointment';
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

    setDate = (date) => {
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
                <div>
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
                                this.setDate(appointment.date) < this.setDate(new Date()) ? 
                                <tr key={appointment._id}>
                                    <td><NavLink to={`appointments/${appointment._id}`}>{this.setDate(appointment.date)}</NavLink></td>
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
                <div>
                    <button className='button-add' onClick={()=>{this.handleOnClick()}}> {this.state.addAppointment ? 'Cancelar' : 'Criar novo atendimento'}</button>
                    {this.state.addAppointment === true ? 
                        <div>
                            <AddAppointment getAppointments={this.getAppointments}/>
                            <AddAppointment getAppointments={this.getAppointments}/>
                        </div> :
                        <div></div>
                    }
                </div>
            </>
        )
    }
};

export default PastAppointments;