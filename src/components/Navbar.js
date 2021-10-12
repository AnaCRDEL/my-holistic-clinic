import React from 'react';
import { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <> 
            <NavLink to='/professionals'>Profissionais</NavLink>
            <NavLink to='/patients'>Pacientes</NavLink>
            <NavLink to='/appointments'>Atendimentos</NavLink>
            </>
        )
    }
}

export default Navbar;