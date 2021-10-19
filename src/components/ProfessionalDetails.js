import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import EditProfessional from './EditProfessional';
const { Component } = require("react");

class ProfessionalDetails extends Component {
    state = {
        nome: '',
        telefone: '',
        email: '',
        especialidades: '',
        editProfessional: false
    };

    getProfessional = async () => {
        const response = await api.getOneProfessional(this.props.match.params.id);
        const {nome, telefone, email, especialidades} = response.data;
        this.setState({
            nome, 
            telefone, 
            email, 
            especialidades
        })
    }

    componentDidMount = async () => {
        this.getProfessional();
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
                                        <td>{this.state.nome}</td>
                                    </tr>
                                    <tr>
                                        <th>Telefone:</th>
                                        <td>{this.state.telefone}</td>
                                    </tr>
                                    <tr>
                                        <th>Email:</th>
                                        <td>{this.state.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Especialidades:</th>
                                        <td>{this.state.especialidades}</td>
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