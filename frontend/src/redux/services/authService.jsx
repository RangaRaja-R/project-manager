import axios from "axios";

class authService {
    constructor() {
        this.base = "http://localhost:8000/user";
        this.axios = axios.create({
            withCredentials: true,
        });
    }
    getAll(id) {
        return this.axios.get(`${this.base}/all?from=${id}`);
    }
    isLoggedIn() {
        return this.axios.get(`${this.base}/`);
    }
    signUp(data) {
        return this.axios.post(`${this.base}/register`, data);
    }
    signIn(data) {
        return this.axios.post(`${this.base}/login`, data);
    }
    signOut() {
        return this.axios.post(`${this.base}/logout`);
    }
    delete() {
        return this.axios.delete(`${this.base}/delete`);
    }
}

export default new authService();
