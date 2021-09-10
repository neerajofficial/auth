import axios from 'axios'

const baseURL = process.env.REACT_APP_API_SERVER;

const instance = axios.create({
    baseURL: baseURL
})

export default instance;