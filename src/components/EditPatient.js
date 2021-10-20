import React, { Component } from "react";
import api from '../utils/api.utils';

class EditPatient extends Component {
    state = {
        nome: '',
        telefone: '',
        dataNascimento: '',
        email: '',
        endereço: '',
        sintomas: ''
    };   
    
    setDate = (date) => {
        const getDate = date.split('T')[0].split('-')
        const getDay = getDate[2];
        const getMonth = getDate[1];
        const getYear = getDate[0];
        const newDate = `${getYear}-${getMonth}-${getDay}`
        this.setState({
            dataNascimento : newDate
        })
    };

    getPatient = async () => {
        const response = await api.getOnePatient(this.props.id);
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
            console.log(error)
        }
    };

    render() {
        return (
            <div className='div-table-details'>
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
                <textarea name='sintomas' value={this.state.sintomas} onChange={this.handleChange}/>
                <button className='button' type='submit'>Salvar alterações</button>
                </form>
            </div>
        )
    }
}

export default EditPatient;