import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import AddPatient from './AddPatient';
import { NavLink } from 'react-router-dom';
const { Component } = require("react");

class Patients extends Component {
    state = {
        patients: [],
        searchPatients: [],
        addPatient: false
    };

    getPatients = async () => {
        const response = await api.getPatients();
        this.setState({
            patients: response.data,
            searchPatients: response.data
        })
    }

    componentDidMount = async () => {
        this.getPatients();
    };

    handleSearchFilter(event){
        const copyPatients = [...this.state.patients]
        let filteredPatients = copyPatients.filter(element=>{
            let nameLow = element.name.toLowerCase()
            let eventLow = event.target.value.toLowerCase()
            return nameLow.includes(eventLow)
        })
        this.setState({
            searchPatients: filteredPatients
        }) 
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
                <div className='div-page'>
                    <h2>Pacientes</h2>
                    <div className='div-buttons'>
                        <button className='primary-button' onClick={()=>{this.handleOnClick()}}> {this.state.addPatient ? 'Cancelar' : 'Cadastrar novo paciente'}</button>
                        <NavLink to='/non-active-patients'><button className='secondary-button'>Pacientes desativados</button></NavLink>
                        {this.state.addPatient === true ? 
                            <div>
                                <AddPatient getPatients={this.getPatients}/>
                            </div> :
                            <div></div>
                        }
                    </div>
                    <div className='div-patients-table'>
                        <form>
                            <input className='search-bar' type='text' placeholder='Procurar por paciente' name='filterPatients' onChange={(event)=>{this.handleSearchFilter(event)}}/>
                        </form>
                        <table cellSpacing='0' border='1' className='table'>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Telefone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.searchPatients.map((patient) => (
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