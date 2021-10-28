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

    setDate = (date) => {
        const newDate = new Date(date).toLocaleDateString('br', {timeZone: 'UTC'})
        return newDate;
    };

    handleOnClick = () => {
        this.setState({
            editProfessional: !this.state.editProfessional
        });
    }; 

    handleOnChange = (event) => {
        const file = event.target.files[0]
        this.setState({
            file
        })
    }

    handleOnSubmit = async (event) => {
        event.preventDefault();
        const id = this.props.match.params.id
        const uploadData = new FormData();
        uploadData.append('image', this.state.file)
        console.log(uploadData)
        try {
            const test = await api.updatedPictureProfessional(id, uploadData)
            console.log(test)
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
                <div className='professional-details-page'>
                    <div className='buttons-div-details'> 
                        <button className='button-edit-professional' onClick={()=>{this.handleOnClick()}}> {this.state.editProfessional ? 'Cancelar' : 'Editar informações'}</button>
                    </div>
                    {this.state.editProfessional === true ? 
                        <div>
                            <EditProfessional handleOnClick={()=>{this.handleOnClick()}} getProfessional={this.getProfessional} id={this.props.match.params.id}/>
                        </div> :
                        <div className='div-professional-details'>
                            <div className='div-pic'>
                                <img className='professional-pic' src={this.state.profilePicture} alt='professional-pic' />
                                <form>
                                    <label>Mudar a foto do profissional</label>
                                    <input type='file' onChange={this.handleOnChange}></input>
                                    <button type='submit' onClick={this.handleOnSubmit}>Confirmar</button>
                                </form>
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
                                                        <p>{this.setDate(appointment.date)}</p>
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