import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import EditAppointment from './EditAppointment';
const { Component } = require("react");

class AppointmentDetails extends Component {
    state = {
        date: '',
        time: '',
        patient: '',
        professional: '',
        beforeAppointment: '',
        afterAppointment: '',
        treatment: '',
        editAppointment: false,
        deleted: false
    };

    getAppointment = async () => {
        const response = await api.getOneAppointment(this.props.match.params.id);
        const {date, time, patient, professional, beforeAppointment, afterAppointment, treatment} = response.data;
        this.setState({
            date: this.setDate(date), 
            time, 
            patient, 
            professional, 
            beforeAppointment, 
            afterAppointment, 
            treatment,
        })
    };

    setDate = (date) => {
        const newDate = new Date(date).toLocaleDateString('br', {timeZone: 'UTC'})
        return newDate;
    };

    componentDidMount = async () => {
        await this.getAppointment();
    };

    handleOnClick = () => {
        this.setState({
            editAppointment: !this.state.editAppointment
        });
    }; 

    handleOnClickDeleteAppointment = async () => {
        if (window.confirm('Tem certeza que deseja cancelar esse agendamento?')) {
            await api.deleteAppointment(this.props.match.params.id);
            await this.props.history.push('/appointments')
        }
    };

    render() {
        return(
            <>
                <div>
                    <Navbar/>
                </div>
                <div>
                        <div>
                        <button className='button-add' onClick={()=>{this.handleOnClick()}}> {this.state.editAppointment ? 'Cancelar' : 'Editar informações do Atendimento'}</button>
                        <button className='button-deactivate' onClick={()=>{this.handleOnClickDeleteAppointment()}}>Cancelar Atendimento</button>
                        {this.state.editAppointment === true ? 
                            <div>
                                <EditAppointment id={this.props.match.params.id} handleOnClick={()=>{this.handleOnClick()}} getAppointment={this.getAppointment}/>
                            </div> :
                            <div>
                                <table cellSpacing='0' border='1' className='div-table-details'>
                                    <tbody>
                                        <tr>
                                            <th>Data:</th>
                                            <td>{this.state.date}</td>
                                        </tr>
                                        <tr>
                                            <th>Horário:</th>
                                            <td>{this.state.time}</td>
                                        </tr>
                                        <tr>
                                            <th>Paciente:</th>
                                            <td><NavLink to={`/patients/${this.state.patient._id}`}> {this.state.patient.name} </NavLink></td>
                                        </tr>
                                        <tr>
                                            <th>Profissional:</th>
                                            <td><NavLink to={`/professionals/${this.state.professional._id}`}>{this.state.professional.name}</NavLink></td>
                                        </tr>
                                        <tr>
                                            <th>Como estava o paciente antes do atendimento:</th>
                                            <td>{this.state.beforeAppointment}</td>
                                        </tr>
                                        <tr>
                                            <th>Como o paciente se sentiu após o atendimento:</th>
                                            <td>{this.state.afterAppointment}</td>
                                        </tr>
                                        <tr>
                                            <th>Quais técnicas e tratamentos foram utilizados no atendimento:</th>
                                            <td>{this.state.treatment}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                        </div>
                </div>
            </>
        )
    }
};

export default AppointmentDetails;