import React from 'react';
import { Component } from "react";
import { NavLink } from "react-router-dom";

import '../App.css'

class Navbar extends Component {
    render() {
        return (
            <>
                <div className='nav-bar'>  
                    <NavLink to='/home'> <img src='' alt='home-logo'/> </NavLink>
                    <NavLink to='/patients'>Pacientes</NavLink>
                    <NavLink to='/professionals'>Profissionais</NavLink>
                    <NavLink to='/appointments'>Atendimentos</NavLink>
                </div>
            </>
        )
    }
}

export default Navbar;