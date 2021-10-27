import React, { Component } from "react";
import api from '../utils/api.utils';

class AddAppointment extends Component {
    state = {
        date: '',
        time: '',
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
        try {
            await api.addAppointment(this.state);
            await this.props.getAppointments();
            this.setState({
                date: '',
                time: '',
                patient: '',
                professional: '',
            });
        } catch (error) {
            console.log(error)
        }
    };

    render() {
        return (
            <div className='div-add-professional'>
                <form className='form-add-professional' onSubmit={this.handleSubmit}>
                <label name='date'>Data:</label>
                <input type='date' name='date' value={this.state.date} onChange={this.handleChange} />
                <label name='time'>Horário:</label>
                <input type='time' name='time' value={this.state.time} onChange={this.handleChange} />
                <label name='patient'>Paciente:</label>
                <select name='patient' onChange={this.handlePatientChange}>
                    <option value=''>Selecione</option>
                    {this.state.patientsList.map((patient) => (
                        <option key={patient._id} value={patient.name}>{patient.name}</option>
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