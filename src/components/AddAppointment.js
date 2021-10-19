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

    handlePatientChange = (event) => {
        const patient = this.state.patientsList.find(patient => patient.nome === event.target.value)
        this.setState({
            paciente: patient._id,
        })
    }; 

    handleProfessionalChange = (event) => {
        const professional = this.state.professionalsList.find(professional => professional.nome === event.target.value)
        this.setState({
            profissional: professional._id
        })
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
            <div className='div-form'>
                <form onSubmit={this.handleSubmit}>
                <label name='data'>Data:</label>
                <input type='date' name='data' value={this.state.data} onChange={this.handleChange} />
                <label name='horario'>Horário:</label>
                <input type='time' name='horario' value={this.state.horario} onChange={this.handleChange} />
                <label name='paciente'>Paciente:</label>
                <select name='paciente' onChange={this.handlePatientChange}>
                    <option value=''>Selecione</option>
                    {this.state.patientsList.map((patient) => (
                        <option key={patient._id} value={patient.nome}>{patient.nome}</option>
                        )
                    )}
                </select> 
                <label name='profissional'>Profissional:</label>
                <select name='profissional' onChange={this.handleProfessionalChange}>
                    <option value=''>Selecione</option>
                    {this.state.professionalsList.map((profissional) => (
                        <option key={profissional._id} value={profissional.nome} onChange={this.handleSelectChange}>{profissional.nome}</option>
                        )
                    )}
                </select> 
                <button className='button' type='submit'>Criar</button>
                </form>
            </div>
        )
    }
}

export default AddAppointment;