import axios from "axios";

class projectService {
    constructor() {
        this.base = "https://project-manager-jqsq.onrender.com/project";
        this.axios = axios.create({
            withCredentials: true,
        });
    }
    getProjects(id) {
        return this.axios.get(`${this.base}/get-owned?owner=${id}`);
    }
    getProject(id) {
        return this.axios.get(`${this.base}/get?id=${id}`);
    }
    createProject(project) {
        return this.axios.post(`${this.base}/create`, project);
    }
    deleteProject(id) {
        return this.axios.delete(`${this.base}/delete?id=${id}`);
    }
    updateProject(project) {
        return this.axios.put(`${this.base}/update`, project);
    }
}

export default new projectService();
