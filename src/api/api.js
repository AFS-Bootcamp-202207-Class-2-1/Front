import axios from "axios";

const api = axios.create({
    baseURL: "https://imovie-backend-dev.herokuapp.com"
})
  
export default api;
