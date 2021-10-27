import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import AddPatient from './AddPatient';
import { NavLink } from 'react-router-dom';
const { Component } = require("react");

class Patients extends Component {
    state = {
        patients: [],
        addPatient: false
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

    handleOnClick = () => {
        this.setState({
            addPatient: !this.state.addPatient
        });
    }; 

    render() {
        return(
            <>
                <div>
                    <Navbar/>
                </div>
                <div className='patients-page'>
                    <h2>Pacientes</h2>
                    <div className='div-buttons'>
                        <button className='button-add-patient' onClick={()=>{this.handleOnClick()}}> {this.state.addPatient ? 'Cancelar' : 'Cadastrar novo paciente'}</button>
                        <NavLink to='/non-active-patients'><button className='button-non-active-patients'>Pacientes desativados</button></NavLink>
                        {this.state.addPatient === true ? 
                            <div>
                                <AddPatient getPatients={this.getPatients}/>
                            </div> :
                            <div></div>
                        }
                    </div>
                    <div className='div-patients-table'>
                        <table cellSpacing='0' border='1' className='patient-table'>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Telefone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.patients.map((patient) => (
                                    patient.isActive ?  
                                    <tr key={patient._id}>
                                        <td><NavLink to={`patients/${patient._id}`}>{patient.name}</NavLink></td>
                                        <td>{patient.phoneNumber}</td>
                                    </tr>
                                    : null ) 
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
};

export default Patients;