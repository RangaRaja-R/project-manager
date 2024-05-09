import axios from "axios";

class noteService{
    constructor() {
        this.base = 'http://localhost:8000/notes';
    }
    get(id){
        return axios.get(`${this.base}/?owner=${id}`);
    }
    update(data){
        console.log(data)
        return axios.post(`${this.base}/update`, data);
    }
}
export default new noteService();