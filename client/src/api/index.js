import axios from "axios";

const  $host = axios.create({
    baseURL: 'https://localhost:7109/'
})
export {$host}