import axios from 'axios';

const ENDPOINT = import.meta.env.VITE_ENDPOINT;

export default async (tag, password) => {
    const data = await axios.get(`${ENDPOINT}/user`);

    return data.data.find(user => user.tag === tag && user.password === password);
}
