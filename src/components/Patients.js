import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import AddPatient from './AddPatient';
const { Component } = require("react");

class Patients extends Component {
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
                        </tr>
                        {this.state.patients.map((patient) => (
                            <tr key={patient._id}>
                                <td>{patient.nome}</td>
                                <td>{patient.telefone}</td>
                            </tr>
                            )
                        )}
                    </table>
                </div>
                <div>
                    <AddPatient getPatients={this.getPatients}/>
                </div>
            </>
        )
    }
};

export default Patients;