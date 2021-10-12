import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import Signup from './Signup';
const { Component } = require("react");

class Professionals extends Component {
    state = {
        professionals: [],
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

    // handleCheck = async (event) => {
    //     const id = event.target.id;
    //     const payload = {
    //         'title': event.target.name,
    //         'completed': event.target.checked
    //     }
    //     await api.updateProfessional(id, payload)
    //     await this.getProfessionals();
    // };

    // onClick = async (event) => {
    //     const id = event.target.id;
    //     await api.deleteProfessional(id);
    //     await this.getProfessionals();
    // };

    render() {
        return(
            <>
                <div>
                    <Navbar/>
                </div>
                <div>
                    <table border="1">
                        <tr>
                            <td>Nome</td>
                            <td>Telefone</td>
                            <td>Especialidades</td>
                        </tr>
                        {this.state.professionals.map((item) => (
                            <tr key={item._id}>
                                <td>{item.nome}</td>
                                <td>{item.telefone}</td>
                                <td>{item.especialidades}</td>
                            </tr>
                        )
                    )}
                    </table>
                </div>
                <div>
                    <Signup getProfessionals={this.getProfessionals}/>
                </div>
            </>
        )
    }
};

export default Professionals;