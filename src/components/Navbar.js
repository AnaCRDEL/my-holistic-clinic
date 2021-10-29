import React from 'react';
import { Component } from "react";
import { NavLink } from "react-router-dom";

import '../App.css'

class Navbar extends Component {
    render() {
        return (
            <>
                <div className='nav-bar'>  
                    <NavLink to='/home'> <img id='logo-img' src='../logo-home.png' alt='home-logo'/> </NavLink>
                    <NavLink className='nav-link' to='/home'>Home</NavLink>
                    <NavLink className='nav-link' to='/patients'>Pacientes</NavLink>
                    <NavLink className='nav-link' to='/professionals'>Profissionais</NavLink>
                    <NavLink className='nav-link' to='/appointments'>Atendimentos</NavLink>
                </div>
            </>
        )
    }
}

export default Navbar;