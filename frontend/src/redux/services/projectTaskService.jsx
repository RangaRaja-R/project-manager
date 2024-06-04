import axios from "axios";

class projectTaskService {
    constructor() {
        this.base = "https://project-manager-jqsq.onrender.com/project/task";
        this.axios = axios.create({
            withCredentials: true,
        });
    }
    create(data) {
        return this.axios.post(`${this.base}/create`, data);
    }
    all(id) {
        return this.axios.get(`${this.base}/list?owner=${id}`);
    }
    one(id) {
        return this.axios.get(`${this.base}/details?id=${id}`);
    }
    update(data) {
        return this.axios.put(`${this.base}/update`, data);
    }
    delete(id) {
        return this.axios.delete(`${this.base}/delete?id=${id}`);
    }
    status(id, status) {
        return this.axios.put(`${this.base}/status?id=${id}&status=${status}`);
    }
}
export default new projectTaskService();
