import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import EditPatient from './EditPatient';
const { Component } = require("react");

class PatientDetails extends Component {
    state = {
        nome: '',
        telefone: '',
        dataNascimento: '',
        email: '',
        endereço: '',
        sintomas: '',
        editPatient: false,
        deactivationReason: ''
    };

    getPatient = async () => {
        const response = await api.getOnePatient(this.props.match.params.id);
        const {nome, telefone, dataNascimento, email, endereço, sintomas} = response.data;
        this.setDate(dataNascimento)
        this.setState({
            nome,
            telefone,
            email,
            endereço,
            sintomas
        })
    };

    setDate = (date) => {
        const getDate = date.split('T')[0].split('-')
        const getDay = getDate[2];
        const getMonth = getDate[1];
        const getYear = getDate[0];
        const newDate = `${getDay}/${getMonth}/${getYear}`
        this.setState({
            dataNascimento : newDate
        })
    };

    componentDidMount = async () => {
        this.getPatient();
    };

    handleOnClick = () => {
        this.setState({
            editPatient: !this.state.editPatient
        });
    }; 

    handleOnClickDisablePatient = () => {
        const deactivationReason = prompt('Digite o motivo da desativação deste cliente:')
        if (deactivationReason) {
            this.setState({
                deactivationReason
            })
        }
        console.log(deactivationReason)
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
                    <button className='button' onClick={()=>{this.handleOnClickDisablePatient()}}>Desativar Paciente</button>
                    {this.state.editPatient === true ? 
                        <div>
                            <EditPatient id={this.props.match.params.id}/>
                        </div> :
                        <div>
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
                                        <th>Data de Nascimento:</th>
                                        <td>{this.state.dataNascimento}</td>
                                    </tr>
                                    <tr>
                                        <th>Endereço:</th>
                                        <td>{this.state.endereço}</td>
                                    </tr>
                                    <tr>
                                        <th>Sintomas:</th>
                                        <td>{this.state.sintomas}</td>
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