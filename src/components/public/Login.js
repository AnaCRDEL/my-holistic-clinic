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
            this.props.history.push('/home')
        } catch (error) {
            this.setState({
                message: 'Login falhou'
            })
        }
    };

    render() {
        return (
            <div> 
                <form onSubmit={this.handleSubmit}>
                    <label>Email</label>
                    <input type='text' name='email' value={this.state.email} onChange={this.handleInput}/>
                    <label>Password</label>
                    <input type='password' name='password' value={this.state.password} onChange={this.handleInput}/>
                    <button type='submit'>Login</button>
                </form>
                {this.state.message ? 
                    <div>{this.state.message}</div> : null}
            </div>
        )
    }
};

export default Login;