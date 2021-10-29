import React from 'react';
import { Component } from "react";
import { NavLink } from "react-router-dom";

import '../../App.css'
import Login from './Login';

class PublicNavbar extends Component {
    state = {
        loginForm: false
    }

    handleOnClick = () => {
        this.setState({
            loginForm: !this.state.loginForm
        });
    }

    render() {
        return (
            <>
                <div className='pub-nav-bar'>  
                    <NavLink to='/'> <img id='logo-img' src='../logo-home.png' alt='home-logo'/> </NavLink>
                    <NavLink className='pub-nav-link' to='/'>Home</NavLink>
                    <NavLink className='pub-nav-link' to='/...'>About Us</NavLink>
                    <NavLink className='pub-nav-link' to='/...'>Treatments</NavLink>
                    <NavLink className='pub-nav-link' to='/...'>Our Professionals</NavLink>
                    <NavLink className='pub-nav-link' to='/...'>Contact Us</NavLink>
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