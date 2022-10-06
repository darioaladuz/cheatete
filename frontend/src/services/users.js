import axios from 'axios';
const baseUrl = 'http://localhost:5500/api/users';

let token = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`;
}

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
}

const register = async credentials => {
    const res = await axios.post(`${baseUrl}/register`, credentials);
    return res.data;
}

const login = async credentials => {
    const res = await axios.post(`${baseUrl}/login`, credentials);
    return res.data;
}

export default {
    setToken,
    getAll,
    register,
    login
}