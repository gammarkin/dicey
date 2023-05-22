import axios from 'axios';

const ENDPOINT = import.meta.env.VITE_ENDPOINT;

export default async (id) =>
    axios.get(`${ENDPOINT}/character/${id}`);