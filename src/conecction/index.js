import axios from "axios";
import { notify } from "../notify";

class conecction {
    constructor(token) {
        this.token = token;
        this.axiosCon = axios.create({
            // baseURL: 'http://127.0.0.1:8000/api/'
            baseURL: 'https://api.carlosjaramillo.beauty/api/'
        });
    }

    async loadData(method = '', url = '', data = {}, token = false, errorResponse = false) {

        if (token && (!this.token || this.token !== localStorage.getItem('token'))) {
            this.token = localStorage.getItem('token');
        }

        const header = token ? {
            Authorization: this.token
        } : {};

        try {
            return await this.axiosCon({
                method: method,
                url: url,
                data: data,
                headers: header
            });
        } catch (error) {

            if (!errorResponse) {
                notify('¡Error al obtener los datos del servidor!', 'error')
                return;
            }
            // error.response.status == 401 ||
            if (errorResponse && error.response && (error.response.status == 400)) {
                notify(error.response.data, 'error');
            }

        }
    }

    setToken(token) {
        this.token = token;
    }
};

export default conecction;