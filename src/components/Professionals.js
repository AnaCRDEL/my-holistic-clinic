import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import Signup from './Signup';
import { NavLink } from 'react-router-dom';
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
                <div>
                    <table cellSpacing='0' border='1' className='div-table'>
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
                <div>
                    <button className='button-add' onClick={()=>{this.handleOnClick()}}> {this.state.addProfessional ? 'Cancelar' : 'Cadastrar novo profissional'}</button>
                    {this.state.addProfessional === true ? 
                        <div>
                            <Signup getProfessionals={this.getProfessionals}/>
                        </div> :
                        <div></div>
                    }
                </div>
            </>
        )
    }
};

export default Professionals;