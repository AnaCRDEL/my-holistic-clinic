import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
const { Component } = require("react");

class NonActivePatients extends Component {
    state = {
        patients: [],
    };

    getPatients = async () => {
        const response = await api.getPatients();
        this.setState({
            patients: response.data
        })
    }

    componentDidMount = async () => {
        this.getPatients();
    };

    render() {
        return(
            <>
                <div>
                    <Navbar/>
                </div>
                <div>
                    <table cellSpacing='0' border='1' className='div-table'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.patients.map((patient) => (
                                !patient.isActive ?  
                                <tr key={patient._id}>
                                    <td><NavLink to={`patients/${patient._id}`}>{patient.name}</NavLink></td>
                                    <td>{patient.phoneNumber}</td>
                                </tr>
                                : null ) 
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
};

export default NonActivePatients;