import React, { Component } from "react";
import api from '../utils/api.utils';

class AddProfessional extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        knownTechniques: '',
        message: ''
    };

    handleInput = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.signup(this.state)
            await this.props.getProfessionals();
            this.setState({
                name: '',
                email: '',
                password: '',
                phoneNumber: '',
                knownTechniques: '',
                message: 'User successfully created'
            })
        } catch (error) {
            console.log(error)
            this.setState({
                message: 'Invalid or already registered information'
            })
        } 
    };

    render() {
        return (
            <div className='div-add-professional'> 
                <form className='form-add-professional' onSubmit={this.handleSubmit}>
                    <label name='name'>Nome</label>
                    <input type='text' name='name' value={this.state.name} onChange={this.handleInput}/>
                    <label name='email'>Email</label>
                    <input type='text' name='email' value={this.state.email} onChange={this.handleInput}/>
                    <label name='phoneNumber'>Telefone</label>
                    <input type='number' name='phoneNumber' value={this.state.phoneNumber} onChange={this.handleInput}/>
                    <label name='knownTechniques'>Especialidades</label>
                    <input type='text' name='knownTechniques' value={this.state.knownTechniques} onChange={this.handleInput}/>
                    <label>Password</label>
                    <input type='password' name='password' value={this.state.password} onChange={this.handleInput}/> 
                    <button className='button-form' type='submit'>Criar</button>
                </form>
                {this.state.message ? 
                    <div>{this.state.message}</div> : null}
            </div>
        )
    }
};

export default AddProfessional;