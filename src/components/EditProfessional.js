import React, { Component } from "react";
import api from '../utils/api.utils';

class EditProfessional extends Component {
    state = {
        nome: '',
        telefone: '',
        email: '',
        especialidades: ''
    };    

    getProfessional = async () => {
        const response = await api.getOneProfessional(this.props.id);
        const {nome, telefone, email, especialidades} = response.data;
        this.setState({
            nome, 
            telefone, 
            email, 
            especialidades
        })
    }

    componentDidMount = async () => {
        await this.getProfessional();
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
            await api.updatedProfessional(this.props.id, this.state);
            await this.getProfessional();
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
                <label name='email'>Email:</label>
                <input type='email' name='email' value={this.state.email} onChange={this.handleChange} />
                <label name='especialidades'>Especialidades:</label>
                <textarea name='especialidades' value={this.state.especialidades} onChange={this.handleChange}/>
                <button className='button' type='submit'>Salvar alterações</button>
                </form>
            </div>
        )
    }
}

export default EditProfessional;