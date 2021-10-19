import api from '../utils/api.utils';
import React from 'react';
import Navbar from './Navbar';
import AddAppointment from './AddAppointment';
const { Component } = require("react");

class Appointments extends Component {
    state = {
        appointments: [],
        addAppointment: false
    };

    getAppointments = async () => {
        const response = await api.getAppointments();
        this.setState({
            appointments: response.data
        })
    }

    setDate = (date) => {
        const getDate = date.split('T')[0].split('-')
        const getDay = getDate[2];
        const getMonth = getDate[1];
        const getYear = getDate[0];
        const newDate = `${getDay}/${getMonth}/${getYear}`
        return newDate
    };

    componentDidMount = async () => {
        this.getAppointments();
    };

    handleOnClick = () => {
        this.setState({
            addAppointment: !this.state.addAppointment  
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
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Profissional</th>
                                <th>Paciente</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.appointments.map((appointment) => (
                                <tr key={appointment._id}>
                                    <td>{this.setDate(appointment.data)}</td>
                                    <td>{appointment.horario}</td>
                                    <td>{appointment.profissional.nome}</td>
                                    <td>{appointment.paciente.nome}</td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button className='button-add' onClick={()=>{this.handleOnClick()}}> {this.state.addAppointment ? 'Cancelar' : 'Criar novo atendimento'}</button>
                    {this.state.addAppointment === true ? 
                        <div>
                            <AddAppointment getAppointments={this.getAppointments}/>
                        </div> :
                        <div></div>
                    }
                </div>
            </>
        )
    }
};

export default Appointments;