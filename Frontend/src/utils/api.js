import axios from "axios"
const Api = axios.create({
    baseURL: import.meta.env.VITE_BE_URL
})

Api.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers['authorization'] = `Bearer ${token}`
        }
        return config

    } catch (error) {
        console.log("error while using axios common function", error)
    }
})
export default Api