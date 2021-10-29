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
        editProfessional: false,
        editProfessionalPicture: false,
        profilePicture: '',
        file: {}
    };

    getProfessional = async () => {
        const response = await api.getOneProfessional(this.props.match.params.id);
        const {name, phoneNumber, email, knownTechniques, appointments, profilePicture} = response.data;
        this.setState({
            name, 
            phoneNumber, 
            email, 
            knownTechniques,
            appointments,
            profilePicture
        })
    }

    componentDidMount = async () => {
        await this.getProfessional();
    };

    toDate = (date) => {
        return new Date(date);
    };

    formatDate = (date) => {
        const appointmentDate = this.toDate(date).toLocaleString('pt-BR')
        return appointmentDate
    };

    handleOnClick = () => {
        this.setState({
            editProfessional: !this.state.editProfessional
        });
    }; 

    handleOnClickPicture = () => {
        this.setState({
            editProfessionalPicture: !this.state.editProfessionalPicture
        });
    };

    handleOnChange = (event) => {
        const file = event.target.files[0]
        this.setState({
            file
        })
    };

    handleOnSubmit = async (event) => {
        event.preventDefault();
        const id = this.props.match.params.id
        const uploadData = new FormData();
        uploadData.append('image', this.state.file)
        try {
            await api.updatedPictureProfessional(id, uploadData)
            await this.getProfessional();
            this.setState({
                editProfessionalPicture: !this.state.editProfessionalPicture
            });
        } catch (error) {
            console.log(error)
        }
    };

    render() {
        return(
            <>
                <div>
                    <Navbar/>
                </div>
                <div className='div-page'>
                    <div className='div-buttons-right'> 
                        <div className='div-button-left-professionals'> 
                            <NavLink to='/professionals'><button className='primary-button'> Voltar para Profissionais</button></NavLink>
                        </div>
                        <button className='primary-button' onClick={()=>{this.handleOnClick()}}> {this.state.editProfessional ? 'Cancelar' : 'Editar informações'}</button>
                    </div>
                    {this.state.editProfessional === true ? 
                        <div>
                            <EditProfessional handleOnClick={()=>{this.handleOnClick()}} getProfessional={this.getProfessional} id={this.props.match.params.id}/>
                        </div> :
                        <div className='div-professional-details'>
                            <div className='div-pic'>
                                <img className='professional-pic' src={this.state.profilePicture} alt='professional-pic' />
                                    <button className='primary-button' onClick={this.handleOnClickPicture}>Mudar a foto do profissional</button>
                                    {this.state.editProfessionalPicture ? 
                                    <form className='pic-form'>
                                        <input type='file' onChange={this.handleOnChange}/>
                                        <button className='secondary-button' type='submit' onClick={this.handleOnSubmit}>Confirmar</button>
                                    </form>
                                    : null
                                    }
                            </div> 
                            <table cellSpacing='0' border='1' className='professional-details-table'>
                                <tbody> 
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
                                        <th>Especialidades</th>
                                        <td>{this.state.knownTechniques}</td>
                                    </tr>
                                    <tr>
                                        <th>Atendimentos</th>
                                        <td className='appointments'>
                                            {this.state.appointments.map((appointment) => (
                                                <NavLink key={appointment._id} to={`/appointments/${appointment._id}`}>
                                                    <div className='appointment'>
                                                        <p>{this.formatDate(appointment.dateTime)}</p>
                                                        <p>{appointment.time}</p>
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

export default ProfessionalDetails;