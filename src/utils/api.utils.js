import axios from 'axios';

class Api {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://myholisticclinicapi.herokuapp.com/'
        });
        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers = {
                        Authorization: `Bearer ${token}`
                    }
                } 
                return config
            }, 
            (error) => console.log(error)
        );

        this.api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response.status === 401) {
                    window.location = '/'
                    return
                }
                throw error
            }
        )
    };

    signup = async (payload) => {
        try {
            await this.api.post('/auth/signup', payload);
        } catch (error) {
            throw new Error(error)
        }
    };

    login = async (payload) => {
        try {
            const { data } = await this.api.post('/auth/login', payload);
            const { token } = data;
            const ID = data.payload.id;
            localStorage.setItem('token', token);
            localStorage.setItem('ID', ID);
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    };

    getProfessionals = async () => {
        try {
            return await this.api.get('/professionals')
        } catch (error) {
            console.log('getProfessionals error', error)
        }
    };

    getOneProfessional = async (id) => {
        try {
            return await this.api.get(`/professionals/${id}`)
        } catch (error) {
            console.log('getOneProfessional error', error)
        }
    };

    updatedProfessional = async (id, payload) => {
        try {
            await this.api.put(`/professionals/${id}`, payload);
        } catch (error) {
            console.log('updateProfessional error', error)
            throw new Error(error)
        }
    };

    deleteProfessional = async (id) => {
        try {
            await this.api.delete(`/professionals/${id}`);
        } catch (error) {
            console.log('deleteProfessional error', error)
        }
    };
    
    updatedPictureProfessional = async (id, payload) => {
        try {
            await this.api.post(`/professionals/${id}/profile-picture`, payload);
        } catch (error) {
            console.log('updatedPictureProfessional error', error)
            throw new Error(error)
        }
    };

    getPatients = async () => {
        try {
            return await this.api.get('/patients')
        } catch (error) {
            console.log('getPatients error', error)
        }
    };

    getOnePatient = async (id) => {
        try {
            return await this.api.get(`/patients/${id}`)
        } catch (error) {
            console.log('getOnePatient error', error)
        }
    };


    addPatient = async (payload) => {
        try {
            await this.api.post('/patients', payload);
        } catch (error) {
            console.log('addPatient error', error)
            throw new Error(error)
        }
    };

    updatedPatient = async (id, payload) => {
        try {
            await this.api.put(`/patients/${id}`, payload);
        } catch (error) {
            console.log('updatePatient error', error)
            throw new Error(error)
        }
    };

    getAppointments = async () => {
        try {
            return await this.api.get('/appointments')
        } catch (error) {
            console.log('getAppointment error', error)
        }
    };

    getOneAppointment = async (id) => {
        try {
            return await this.api.get(`/appointments/${id}`)
        } catch (error) {
            console.log('getOneAppointment error', error)
        }
    };


    addAppointment = async (payload) => {
        try {
            await this.api.post('/appointments', payload);
        } catch (error) {
            console.log('addAppointment error', error)
            throw new Error(error)
        }
    };

    updatedAppointment = async (id, payload) => {
        try {
            await this.api.put(`/appointments/${id}`, payload);
        } catch (error) {
            console.log('updatedAppointment error', error)
            throw new Error(error)
        }
    };

    deleteAppointment = async (id) => {
        try {
            await this.api.delete(`/appointments/${id}`);
        } catch (error) {
            console.log('deleteAppointment error', error)
        }
    };
};

export default new Api();