import axios from "axios";

export const backend = import.meta.env.VITE_API_SERVER


const api = axios.create({
    baseURL: backend
})


// Add a request interceptor
api.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = localStorage.getItem("token") || ""
    config.headers.set("authorization", token)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default api

