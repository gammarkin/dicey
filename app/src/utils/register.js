import axios from 'axios';

const ENDPOINT = import.meta.env.VITE_ENDPOINT;

export default async (user) => axios.post(`${ENDPOINT}/user`, user)
