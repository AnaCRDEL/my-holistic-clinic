import React, { Component } from "react";
import api from '../utils/api.utils';

class AddAppointment extends Component {
    state = {
        data: '',
        horario: '',
        paciente: '',
        profissional: '',
        patientsList: [],
        professionalsList: []
    };    
    
    getPatients = async () => {
        const response = await api.getPatients();
        this.setState({
            patientsList: response.data
        })
    };

    getProfessionals = async () => {
        const response = await api.getProfessionals();
        this.setState({
            professionalsList: response.data
        })
    };

    componentDidMount = async () => {
        this.getPatients();
        this.getProfessionals();
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        });
    };  

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.addAppointment(this.state)
            await this.props.getAppointments();
            this.setState({
                data: '',
                horario: '',
                paciente: '',
                profissional: '',
            });
        } catch (error) {
            console.log(error)
        }
    };

    render() {
        return (
            <div>
                <h3>Criar novo atendimento</h3>
                <form onSubmit={this.handleSubmit}>
                <label name='data'>Data:</label>
                <input type='date' name='data' value={this.state.data} onChange={this.handleChange} />
                <label name='horario'>Horário:</label>
                <input type='time' name='horario' value={this.state.horario} onChange={this.handleChange} />
                <label name='paciente'>Paciente:</label>
                <select name='paciente'>
                    {this.state.patientsList.map((patient) => (
                        <option key={patient._id} name='paciente' value={patient.nome} onChange={this.handleChange}>{patient.nome}</option>
                        )
                    )}
                </select> 
                <label name='profissional'>Profissional:</label>
                <select name='profissional'>
                    {this.state.professionalsList.map((profissional) => (
                        <option key={profissional._id} name='profissional' value={profissional.nome} onChange={this.handleChange}>{profissional.nome}</option>
                        )
                    )}
                </select> 
                <button type='submit'>Adicionar</button>
                </form>
            </div>
        )
    }
}

export default AddAppointment;