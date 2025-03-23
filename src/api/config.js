import axios from 'axios'

const apiConfig = axios.creator({
    baseURL: import.meta.env.VITE_URL,
})

export default apiConfig