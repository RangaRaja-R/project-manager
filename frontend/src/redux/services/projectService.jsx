import axios from "axios";

class projectService {
    constructor() {
        this.base = "https://project-manager-jqsq.onrender.com/project";
    }
    getProjects(id) {
        return axios.get(`${this.base}/get-owned?owner=${id}`);
    }
    getProject(id) {
        return axios.get(`${this.base}/get?id=${id}`);
    }
    createProject(project) {
        return axios.post(`${this.base}/create`, project);
    }
    deleteProject(id) {
        return axios.delete(`${this.base}/delete?id=${id}`);
    }
    updateProject(project) {
        return axios.put(`${this.base}/update`, project);
    }
}

export default new projectService();
