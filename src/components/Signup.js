import React, { Component } from "react";
import api from '../utils/api.utils';

class Signup extends Component {
    state = {
        nome: '',
        email: '',
        password: '',
        telefone: '',
        especialidades: '',
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
                nome: '',
                email: '',
                password: '',
                telefone: '',
                especialidades: '',
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
            <div className='div-form'> 
                <form onSubmit={this.handleSubmit}>
                    <label>Nome</label>
                    <input type='text' name='nome' value={this.state.nome} onChange={this.handleInput}/>
                    <label>Email</label>
                    <input type='text' name='email' value={this.state.email} onChange={this.handleInput}/>
                    <label>Telefone</label>
                    <input type='number' name='telefone' value={this.state.telefone} onChange={this.handleInput}/>
                    <label>Especialidades</label>
                    <input type='text' name='especialidades' value={this.state.especialidades} onChange={this.handleInput}/>
                    <label>Password</label>
                    <input type='password' name='password' value={this.state.password} onChange={this.handleInput}/> 
                    <button className='button' type='submit'>Criar</button>
                </form>
                {this.state.message ? 
                    <div>{this.state.message}</div> : null}
            </div>
        )
    }
};

export default Signup;