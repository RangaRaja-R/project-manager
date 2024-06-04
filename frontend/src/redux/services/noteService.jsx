import axios from "axios";

class noteService {
    constructor() {
        this.base = "https://project-manager-jqsq.onrender.com/notes";
        this.axios = axios.create({
            withCredentials: true,
        });
    }
    get(id) {
        return this.axios.get(`${this.base}/`);
    }
    update(data) {
        console.log(data);
        return this.axios.post(`${this.base}/update`, data);
    }
}
export default new noteService();
