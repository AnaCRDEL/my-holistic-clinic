import React, { Component } from "react";
import api from '../../utils/api.utils';

class Login extends Component {
    state = {
        email: '',
        password: '',
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
            await api.login(this.state)
            window.location = '/home'
        } catch (error) {
            this.setState({
                message: 'Login falhou'
            })
        }
    };

    render() {
        return (
            <div> 
                <form className='login-form' onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='Email' name='email' value={this.state.email} onChange={this.handleInput}/>
                    <input type='password' placeholder='Password' name='password' value={this.state.password} onChange={this.handleInput}/>
                    <button className='confirm-login-button' type='submit'>Login</button>
                </form>
                {this.state.message ? 
                    <div className='div-login-message'>{this.state.message}</div> : null}
            </div>
        )
    }
};

export default Login;