import React, { Component } from "react";
import api from '../utils/api.utils';

class EditAppointment extends Component {
    state = {
        dateTime: '',
        patient: '',
        professional: '',
        beforeAppointment: '',
        afterAppointment: '',
        treatment: '',
        professionalsList: []
    };    

    setDate = (date) => {
        const getDate = date.split('T')[0].split('-')
        const getDay = getDate[2];
        const getMonth = getDate[1];
        const getYear = getDate[0];
        const newDate = `${getYear}-${getMonth}-${getDay}`
        return newDate
    };

    getAppointment = async () => {
        const response = await api.getOneAppointment(this.props.id);
        const {dateTime, patient, professional, beforeAppointment, afterAppointment, treatment} = response.data;
        this.setState({
            dateTime, 
            patient, 
            professional, 
            beforeAppointment, 
            afterAppointment, 
            treatment,
        })
    };

    componentDidMount = async () => {
        await this.getAppointment();
        await this.getProfessionals();
    };

    getProfessionals = async () => {
        const response = await api.getProfessionals();
        this.setState({
            professionalsList: response.data
        })
    };

    handleProfessionalChange = (event) => {
        const professional = this.state.professionalsList.find(professional => professional.name === event.target.value)
        this.setState({
            professional: professional._id
        })
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
            await api.updatedAppointment(this.props.id, this.state);
            await this.getAppointment();
            await this.props.handleOnClick();
            await this.props.getAppointment();
        } catch (error) {
            alert('Erro ao editar atendimento. Verifique os dados inseridos.');
        }
    };

    render() {
        return (
            <div className='div-edit-form'>
                <form className='edit-form' onSubmit={this.handleSubmit}>
                <label name='dateTime'>Data & Horário:</label>
                <input type="datetime-local" name="dateTime" value={this.state.dateTime} onChange={this.handleChange} />
                <label name='patient'>Paciente:</label>
                <input type='text' name='patient' readOnly value={this.state.patient.name} onChange={this.handleChange} />
                <label name='professional'>Profissional:</label>
                <select name='professional' onChange={this.handleProfessionalChange}>
                    <option value=''>{this.state.professional.name}</option>
                    {this.state.professionalsList.map((professional) => (
                        <option key={professional._id} value={professional.name} onChange={this.handleSelectChange}>{professional.name}</option>
                        )
                    )}
                </select> 
                <label name='beforeAppointment'>Como estava o paciente antes do atendimento:</label>
                <textarea name='beforeAppointment' value={this.state.beforeAppointment} onChange={this.handleChange}/>
                <label name='afterAppointment'>Como o paciente se sentiu após o atendimento:</label>
                <textarea name='afterAppointment' value={this.state.afterAppointment} onChange={this.handleChange}/>
                <label name='treatment'>Quais técnicas e tratamentos foram utilizados no atendimento:</label>
                <textarea name='treatment' value={this.state.treatment} onChange={this.handleChange}/>
                <button className='button-save-edit' type='submit'>Salvar alterações</button>
                </form>
            </div>
        )
    }
}

export default EditAppointment;