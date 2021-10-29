import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import EditPatient from './EditPatient';
import { NavLink } from 'react-router-dom';
const { Component } = require("react");

class PatientDetails extends Component {
    state = {
        patientCode: 0,
        name: '',
        phoneNumber: '',
        birthDate: '',
        email: '',
        address: '',
        symptoms: '',
        appointments: [],
        deactivationReason: '',
        editPatient: false,
        isActive: true
    };

    getPatient = async () => {
        const response = await api.getOnePatient(this.props.match.params.id);
        const { name, phoneNumber, birthDate, email, address, symptoms, appointments, isActive, deactivationReason } = response.data;
        this.setState({
            name,
            phoneNumber,
            email,
            address,
            symptoms,
            appointments,
            isActive,
            deactivationReason,
            birthDate: this.formatDate(birthDate)
        })
    };

    toDate = (date) => {
        return new Date(date);
    };

    formatDate = (date) => {
        const appointmentDate = this.toDate(date).toLocaleString('pt-BR')
        return appointmentDate
    };

    // futureAppointments = (date) => {
    //     const now = new Date();
    //     const appointmentDate = this.toDate(date)
    //     return (+appointmentDate >= +now)
    // };

    componentDidMount = async () => {
        await this.getPatient();
    };

    handleOnClick = () => {
        this.setState({
            editPatient: !this.state.editPatient
        });
    }; 

    handleOnClickNonActivePatient = async () => {
        const deactivationReason = await prompt('Tem certeza que deseja desativar esse cliente? Digite o motivo da desativação:')
        if (deactivationReason) {
            this.setState({
                deactivationReason,
                isActive: !this.state.isActive
            })
            const updatedPatient = {
                deactivationReason: this.state.deactivationReason,
                isActive: this.state.isActive
            }
            await api.updatedPatient(this.props.match.params.id, updatedPatient);
        }
    };

    handleOnClickActivePatient = async () => {
        if (await window.confirm('Tem certeza que deseja resativar esse cliente?')) {
            this.setState({
                isActive: !this.state.isActive,
                deactivationReason: ''
            })
            const updatedPatient = {
                isActive: this.state.isActive,
                deactivationReason: ''
            }
            await api.updatedPatient(this.props.match.params.id, updatedPatient);
        }
    };

    render() {
        console.log(this.state.appointments)
        return(
            <>
                <div>
                    <Navbar/>
                </div>
                <div className='div-page'>
                    <div className='div-buttons-right'> 
                        <div className='div-button-left'> 
                            <NavLink to='/patients'><button className='primary-button'> Voltar para Pacientes</button></NavLink>
                        </div>
                        <button className='primary-button' onClick={()=>{this.handleOnClick()}}> {this.state.editPatient ? 'Cancelar' : 'Editar informações'}</button>
                        {this.state.isActive ?
                        <button className='secondary-button' onClick={()=>{this.handleOnClickNonActivePatient()}}>Desativar Paciente</button>
                        : 
                        <button className='secondary-button' onClick={()=>{this.handleOnClickActivePatient()}}>Reativar Paciente</button>
                        }
                    </div>
                    {this.state.editPatient ? 
                        <div>
                            <EditPatient id={this.props.match.params.id} handleOnClick={()=>{this.handleOnClick()}} getPatient={this.getPatient}/>
                        </div> :
                        <div className='div-patient-details'>
                            <table cellSpacing='0' border='1' className='details-table'>
                                <tbody>
                                    {this.state.deactivationReason ? 
                                        <tr> 
                                            <th>Motivo desativação</th>
                                            <td>{this.state.deactivationReason}</td>
                                        </tr>
                                    : null
                                    }
                                    <tr>
                                        <th>Nome</th>
                                        <td>{this.state.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Telefone</th>
                                        <td>{this.state.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{this.state.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Data de Nascimento</th>
                                        <td>{this.state.birthDate}</td>
                                    </tr>
                                    <tr>
                                        <th>Endereço</th>
                                        <td>{this.state.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Sintomas</th>
                                        <td>{this.state.symptoms}</td>
                                    </tr>
                                    <tr>
                                        <th>Atendimentos Futuros</th>
                                        <td className='appointments'>
                                        {this.state.appointments.map((appointment) => (
                                            <NavLink key={appointment._id} to={`/appointments/${appointment._id}`}>
                                                <div className='appointment'> 
                                                    <p>{this.formatDate(appointment.dateTime)}</p>
                                                </div>
                                            </NavLink>
                                            )
                                        )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                </div>
                }
            </div>
            </>
        )
    }
};

export default PatientDetails;