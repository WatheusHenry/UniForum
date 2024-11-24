import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
});

export default axiosInstance;