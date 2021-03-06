import React, { Component } from "react";
import api from '../utils/api.utils';

class AddPatient extends Component {
    state = {
        patientCode: 0,
        name: '',
        phoneNumber: '',
        birthDate: '',
        email: '',
        address: '',
        symptoms: '',
        existingPatients: 0
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
                name: '',
                phoneNumber: '',
                birthDate: '',
                email: '',
                address: '',
                symptoms: ''
            });
        } catch (error) {
            alert('Erro ao criar paciente. Verifique os dados inseridos.');
        }
    };

    render() {
        return (
            <div className='div-add'>
                <form className='form-add' onSubmit={this.handleSubmit}>
                <label name='data'>Nome:</label>
                <input type='text' name='name' value={this.state.name} onChange={this.handleChange} />
                <label name='phoneNumber'>Telefone:</label>
                <input type='tel' name='phoneNumber' value={this.state.phoneNumber} onChange={this.handleChange} />
                <label name='birthDate'>Data de Nascimento:</label>
                <input type='date' name='birthDate' value={this.state.birthDate} onChange={this.handleChange} />
                <label name='email'>Email:</label>
                <input type='email' name='email' value={this.state.email} onChange={this.handleChange} />
                <label name='address'>Endere??o:</label>
                <input type='text' name='address' value={this.state.address} onChange={this.handleChange} />
                <label name='symptoms'>Sintomas:</label>
                <textarea name='symptoms' value={this.state.symptoms} onChange={this.handleChange}/>
                <button className='button-form' type='submit'>Criar</button>
                </form>
            </div>
        )
    }
}

export default AddPatient;