import axios from 'axios';
const baseUrl = 'http://localhost:5500/api/links';

let token = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`;
}

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
}

const add = async body => {
    const config = {
        headers: { Authorization: token }
    }
    const res = await axios.post(`${baseUrl}/new`, body, config);
    return res.data;
}

const del = async id => {
    const config = {
        headers: { Authorization: token }
    }
    const res = await axios.delete(`${baseUrl}/delete/${id}`, config);
    return res.data;
}

const update = async (id, body) => {
    const config = {
        headers: { Authorization: token }
    }
    const res = await axios.put(`${baseUrl}/update/${id}`, body, config);
    return res.data;
}

const friend = async id => {
    const config = {
        headers: { Authorization: token }
    }
    const res = await axios.post(`${baseUrl}/friends/add/${id}`, {}, config);
    return res.data;
}

export default {
    setToken,
    getAll,
    add,
    del,
    update
}