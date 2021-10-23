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
        editPatient: false,
    };

    getPatient = async () => {
        const response = await api.getOnePatient(this.props.match.params.id);
        const {name, phoneNumber, birthDate, email, address, symptoms, appointments} = response.data;
        this.setState({
            name,
            phoneNumber,
            email,
            address,
            symptoms,
            appointments,
            birthDate: this.setDate(birthDate)
        })
    };

    setDate = (date) => {
        const newDate = new Date(date).toLocaleDateString('br', {timeZone: 'UTC'})
        return newDate;
    };

    componentDidMount = async () => {
        await this.getPatient();
        console.log(this.state.appointments)
    };

    handleOnClick = () => {
        this.setState({
            editPatient: !this.state.editPatient
        });
    }; 

    handleOnClickDisablePatient = async () => {
        const deactivationReason = await prompt('Tem certeza que deseja desativar esse cliente? Digite o motivo da desativação:')
        if (deactivationReason) {
            this.setState({
                deactivationReason
            })
        }
        console.log(this.state.deactivationReason)
    };

    render() {
        return(
            <>
                <div>
                    <Navbar/>
                </div>
                <div>
                    <button className='button-add' onClick={()=>{this.handleOnClick()}}> {this.state.editPatient ? 'Cancelar' : 'Editar informações do Paciente'}</button>
                    <button className='button-deactivate' onClick={()=>{this.handleOnClickDisablePatient()}}>Desativar Paciente</button>
                    {this.state.editPatient === true ? 
                        <div>
                            <EditPatient id={this.props.match.params.id} handleOnClick={()=>{this.handleOnClick()}} getPatient={this.getPatient}/>
                        </div> :
                        <div>
                            <table cellSpacing='0' border='1' className='div-table-details'>
                                <tbody>
                                    <tr>
                                        <th>Nome:</th>
                                        <td>{this.state.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Telefone:</th>
                                        <td>{this.state.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <th>Email:</th>
                                        <td>{this.state.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Data de Nascimento:</th>
                                        <td>{this.state.birthDate}</td>
                                    </tr>
                                    <tr>
                                        <th>Endereço:</th>
                                        <td>{this.state.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Sintomas:</th>
                                        <td>{this.state.symptoms}</td>
                                    </tr>
                                    <tr>
                                        <th>Atendimento:</th>
                                        <td>
                                        {this.state.appointments.map((appointment) => (
                                            <NavLink key={appointment._id} to={`/appointments/${appointment._id}`}>
                                                <p>{this.setDate(appointment.date)}</p>
                                                <p>{appointment.time}</p>
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