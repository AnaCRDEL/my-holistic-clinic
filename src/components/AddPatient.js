import React, { Component } from "react";
import api from '../utils/api.utils';

class AddPatient extends Component {
    state = {
        nome: '',
        telefone: '',
        dataNascimento: '',
        email: '',
        endereço: '',
        sintomas: ''
    };    
    
    getPatients = async () => {
        const response = await api.getPatients();
        this.setState({
            patientsList: response.data
        })
    };

    componentDidMount = async () => {
        this.getPatients();
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        });
    };  

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.addPatient(this.state)
            await this.props.getPatients();
            this.setState({
                nome: '',
                telefone: '',
                dataNascimento: '',
                email: '',
                endereço: '',
                sintomas: ''
            });
        } catch (error) {
            console.log(error)
        }
    };

    render() {
        return (
            <div>
                <h3>Criar novo paciente</h3>
                <form onSubmit={this.handleSubmit}>
                <label name='data'>Nome:</label>
                <input type='text' name='nome' value={this.state.nome} onChange={this.handleChange} />
                <label name='telefone'>Telefone:</label>
                <input type='tel' name='telefone' value={this.state.telefone} onChange={this.handleChange} />
                <label name='dataNascimento'>Data de Nascimento:</label>
                <input type='date' name='dataNascimento' value={this.state.dataNascimento} onChange={this.handleChange} />
                <label name='email'>Email:</label>
                <input type='email' name='email' value={this.state.email} onChange={this.handleChange} />
                <label name='endereço'>Endereço:</label>
                <input type='text' name='endereço' value={this.state.endereço} onChange={this.handleChange} />
                <label name='sintomas'>Sintomas:</label>
                <input type='text' name='sintomas' value={this.state.sintomas} onChange={this.handleChange} />
                <button type='submit'>Adicionar</button>
                </form>
            </div>
        )
    }
}

export default AddPatient;