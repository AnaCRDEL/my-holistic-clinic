import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import AddProfessional from './AddProfessional';
const { Component } = require("react");

class Professionals extends Component {
    state = {
        professionals: [],
        addProfessional: false
    };

    getProfessionals = async () => {
        const response = await api.getProfessionals();
        this.setState({
            professionals: response.data
        })
    }

    componentDidMount = async () => {
        this.getProfessionals();
    };

    handleOnClick = () => {
        this.setState({
            addProfessional: !this.state.addProfessional
        });
    };

    render() {
        return(
            <>
                <div>
                    <Navbar/>
                </div>
                <div className='div-page'>
                    <h2>Profissionais</h2>
                    <div className='div-buttons'>
                        <button className='primary-button' onClick={()=>{this.handleOnClick()}}> {this.state.addProfessional ? 'Cancelar' : 'Cadastrar novo profissional'}</button>
                        {this.state.addProfessional === true ? 
                            <div>
                                <AddProfessional getProfessionals={this.getProfessionals}/>
                            </div> :
                            <div></div>
                        }
                    </div>
                    <div className='div-professionals-table'>
                        <table cellSpacing='0' border='1' className='table'>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Telefone</th>
                                    <th>Especialidades</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.professionals.map((professional) => (
                                    <tr key={professional._id}>
                                        <td><NavLink to={`professionals/${professional._id}`}>{professional.name}</NavLink></td>
                                        <td>{professional.phoneNumber}</td>
                                        <td>{professional.knownTechniques}</td>
                                    </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
};

export default Professionals;