import axios from "axios";

const api = axios.create({
    baseURL: "http://10.222.232.142:8083"
})
  
export default api;
