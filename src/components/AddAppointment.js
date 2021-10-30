import React, { Component } from "react";
import api from '../utils/api.utils';

class AddAppointment extends Component {
    state = {
        dateTime: '',
        patient: '',
        professional: '',
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

    toDate = (date) => {
        return new Date(date);
    };

    formatDate = (date) => {
        const appointmentDate = this.toDate(date).toLocaleString('pt-BR')
        return appointmentDate
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
        const patient = this.state.patientsList.find(patient => patient.name === event.target.value)
        this.setState({
            patient: patient._id,
        })
    }; 

    handleProfessionalChange = (event) => {
        const professional = this.state.professionalsList.find(professional => professional.name === event.target.value)
        this.setState({
            professional: professional._id
        })
    }; 

    handleSubmit = async (event) => {
        event.preventDefault();
        event.target.value = 'Selecione'
        try {
            await api.addAppointment(this.state);
            await this.props.getAppointments();
            this.setState({
                dateTime: '',
                patient: '',
                professional: '',
            });
        } catch (error) {
            alert('Erro ao criar atendimento. Verifique os dados inseridos.');
        }
    };

    render() {
        return (
            <div className='div-add'>
                <form className='form-add' onSubmit={this.handleSubmit}>
                    <label name='dateTime'>Data & Horário:</label>
                    <input type="datetime-local" name="dateTime" value={this.state.dateTime} onChange={this.handleChange} />
                    <label name='patient'>Paciente:</label>
                    <select name='patient' onChange={this.handlePatientChange}>
                        <option value=''>Selecione</option>
                        {this.state.patientsList.map((patient) => (
                            !patient.deactivationReason ? 
                            <option key={patient._id} value={patient.name}>{patient.name}</option>
                            : null 
                            )
                        )}
                    </select> 
                    <label name='professional'>Profissional:</label>
                    <select name='professional' onChange={this.handleProfessionalChange}>
                        <option value=''>Selecione</option>
                        {this.state.professionalsList.map((professional) => (
                            <option key={professional._id} value={professional.name} onChange={this.handleSelectChange}>{professional.name}</option>
                            )
                        )}
                    </select> 
                    <button className='button-form' type='submit'>Criar</button>
                </form>
            </div>
        )
    }
}

export default AddAppointment;