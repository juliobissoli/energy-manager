import axios from "axios";


let token = localStorage.getItem("token");
const headers = { Authorization: "Bearer " + token };

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
    headers,
});



export default api;

