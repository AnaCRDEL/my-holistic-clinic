import React from 'react';
import { Component } from "react";

import '../../App.css'
import Login from './Login';

class PublicNavbar extends Component {
    state = {
        loginForm: false,
    }

    handleOnClick = () => {
        this.setState({
            loginForm: !this.state.loginForm
        });
    }

    render(props) {
        return (
            <>
                <div className='pub-nav-bar'>  
                    <a className='pub-nav-link' href="#home"><img id='logo-img' src='/images/logo-home.png' alt='home-logo'/> </a>
                    <a className='pub-nav-link' href="#home">Home</a>
                    <a className='pub-nav-link' href="#treatments">Tratamentos</a>
                    <a className='pub-nav-link' href="#professionals">Profissionais</a>
                    <a className='pub-nav-link' href="#contact">Contato</a>
                    <button className='login-button' onClick={()=>{this.handleOnClick()}}> {this.state.loginForm ? 'Cancelar' : 'Acesso Professional'} </button>
                        {this.state.loginForm ? 
                        <Login/> 
                        : null
                    }
                </div>
            </>
        )
    }
}

export default PublicNavbar;