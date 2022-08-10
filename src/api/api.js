import axios from "axios";

const api = axios.create({
    baseURL: "http://10.222.232.142:8080"
})
  
export default api;
