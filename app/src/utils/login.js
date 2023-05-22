import axios from 'axios';

const ENDPOINT = import.meta.env.VITE_ENDPOINT;

export default async (tag, code) =>
    axios.get(`${ENDPOINT}/login/${tag}/${code}`);
