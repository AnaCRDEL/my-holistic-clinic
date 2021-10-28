import React, { Component } from "react";
import api from '../utils/api.utils';

class EditProfessional extends Component {
    state = {
        name: '',
        phoneNumber: '',
        email: '',
        knownTechniques: ''
    };    

    getProfessional = async () => {
        const response = await api.getOneProfessional(this.props.id);
        const {name, phoneNumber, email, knownTechniques} = response.data;
        this.setState({
            name, 
            phoneNumber, 
            email, 
            knownTechniques
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
            await this.props.handleOnClick();
            await this.props.getProfessional();
        } catch (error) {
            console.log(error)
        }
    };

    render() {
        return (
            <div className='div-edit-form'>
                <form className='edit-form' onSubmit={this.handleSubmit}>
                <label name='name'>Nome:</label>
                <input type='text' name='name' value={this.state.name} onChange={this.handleChange} />
                <label name='phoneNumber'>Telefone:</label>
                <input type='tel' name='phoneNumber' value={this.state.phoneNumber} onChange={this.handleChange} />
                <label name='email'>Email:</label>
                <input type='email' name='email' value={this.state.email} onChange={this.handleChange} />
                <label name='knownTechniques'>Especialidades:</label>
                <textarea name='knownTechniques' value={this.state.knownTechniques} onChange={this.handleChange}/>
                <button className='button-save-edit' type='submit'>Salvar alterações</button>
                </form>
            </div>
        )
    }
}

export default EditProfessional;