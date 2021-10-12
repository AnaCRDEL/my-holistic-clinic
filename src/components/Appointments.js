import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import AddAppointment from './AddAppointment';
const { Component } = require("react");

class Appointments extends Component {
    state = {
        appointments: [],
    };

    getAppointments = async () => {
        const response = await api.getAppointments();
        this.setState({
            appointments: response.data
        })
    }

    componentDidMount = async () => {
        this.getAppointments();
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
                            <td>Data</td>
                            <td>Horário</td>
                            <td>Profissional</td>
                            <td>Paciente</td>
                        </tr>
                        {this.state.appointments.map((appointment) => (
                            <tr key={appointment._id}>
                                <td>{appointment.data}</td>
                                <td>{appointment.horario}</td>
                                <td>{appointment.profissional}</td>
                                <td>{appointment.paciente}</td>
                            </tr>
                        )
                    )}
                    </table>
                </div>
                <div>
                    <AddAppointment getAppointments={this.getAppointments}/>
                </div>
            </>
        )
    }
};

export default Appointments;