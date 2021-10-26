import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import EditProfessional from './EditProfessional';
import { NavLink } from 'react-router-dom';
const { Component } = require("react");

class ProfessionalDetails extends Component {
    state = {
        name: '',
        phoneNumber: '',
        email: '',
        knownTechniques: '',
        appointments: [],
        editProfessional: false
    };

    getProfessional = async () => {
        const response = await api.getOneProfessional(this.props.match.params.id);
        const {name, phoneNumber, email, knownTechniques, appointments} = response.data;
        this.setState({
            name, 
            phoneNumber, 
            email, 
            knownTechniques,
            appointments
        })
    }

    componentDidMount = async () => {
        await this.getProfessional();
    };

    setDate = (date) => {
        const newDate = new Date(date).toLocaleDateString('br', {timeZone: 'UTC'})
        return newDate;
    };

    handleOnClick = () => {
        this.setState({
            editProfessional: !this.state.editProfessional
        });
    }; 

    render() {
        return(
            <>
                <div>
                    <Navbar/>
                </div>
                <div>
                    <button className='button-add' onClick={()=>{this.handleOnClick()}}> {this.state.editProfessional ? 'Cancelar' : 'Editar informações do Paciente'}</button>
                    {this.state.editProfessional === true ? 
                        <div>
                            <EditProfessional id={this.props.match.params.id}/>
                        </div> :

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
                                        <th>Especialidades:</th>
                                        <td>{this.state.knownTechniques}</td>
                                    </tr>
                                    <tr>
                                        <th>Atendimentos:</th>
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
                    }
                </div>
            </>
        )
    }
};

export default ProfessionalDetails;