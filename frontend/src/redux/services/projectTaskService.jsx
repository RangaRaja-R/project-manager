import axios from "axios";

class projectTaskService {
    constructor() {
        this.base = "http://localhost:8000/project/task";
    }
    create(data) {
        return axios.post(`${this.base}/create`, data);
    }
    all(id) {
        return axios.get(`${this.base}/list?owner=${id}`);
    }
    one(id) {
        return axios.get(`${this.base}/details?id=${id}`);
    }
    update(data) {
        return axios.put(`${this.base}/update`, data);
    }
    delete(id) {
        return axios.delete(`${this.base}/delete?id=${id}`);
    }
    status(id, status) {
        return axios.put(`${this.base}/status?id=${id}&status=${status}`);
    }
}
export default new projectTaskService();
