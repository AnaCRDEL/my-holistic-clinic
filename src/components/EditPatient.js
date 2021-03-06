import React, { Component } from "react";
import api from '../utils/api.utils';

class EditPatient extends Component {
    state = {
        name: '',
        phoneNumber: '',
        birthDate: '',
        email: '',
        address: '',
        symptoms: ''
    };   
    
    setDate = (date) => {
        const getDate = date.split('T')[0].split('-')
        const getDay = getDate[2];
        const getMonth = getDate[1];
        const getYear = getDate[0];
        const newDate = `${getYear}-${getMonth}-${getDay}`
        this.setState({
            birthDate : newDate
        })
    };

    getPatient = async () => {
        const response = await api.getOnePatient(this.props.id);
        const {name, phoneNumber, birthDate, email, address, symptoms} = response.data;
        this.setDate(birthDate)
        this.setState({
            name,
            phoneNumber,
            email,
            address,
            symptoms
        })
    };

    componentDidMount = async () => {
        await this.getPatient();
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
            await api.updatedPatient(this.props.id, this.state);
            await this.getPatient();
            await this.props.handleOnClick();
            await this.props.getPatient();
        } catch (error) {
            alert('Erro ao editar Paciente. Verifique os dados inseridos.');
        }
    };

    render() {
        return (
            <div className='div-edit-form'>
                <form className='edit-form' onSubmit={this.handleSubmit}>
                    <div>
                        <label name='name'>Nome</label>
                        <input className='text-input' type='text' name='name' value={this.state.name} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label name='phoneNumber'>Telefone</label>
                        <input className='numeric-input' type='tel' name='phoneNumber' value={this.state.phoneNumber} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label name='email'>Email</label>
                        <input className='text-input' type='email' name='email' value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label name='birthDate'>Data de Nascimento</label>
                        <input className='numeric-input' type='date' name='birthDate' value={this.state.birthDate} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label name='address'>Endere??o</label>
                        <textarea className='textarea-input' name='address' value={this.state.address} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label name='symptoms'>Sintomas</label>
                        <textarea className='textarea-input' name='symptoms' value={this.state.symptoms} onChange={this.handleChange}/>
                    </div>
                    <button className='button-save-edit' type='submit'>Salvar altera????es</button>
                </form>
            </div>
        )
    }
}

export default EditPatient;