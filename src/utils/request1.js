/**
 * 网络请求配置
 */
import axios from "axios";

// let token = localStorage.getItem("token");
// token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZXhwbG9yZXJhZG1pbiIsIm5ldHdvcmsiOiJvcmcxLW5ldHdvcmsiLCJpYXQiOjE2NDI2Njc0MjQsImV4cCI6MTY0MjY3NDYyNH0.nubyw-5iMnGowgbUa0OnMljJgaXJw6QDbqf1wX14yYo";


axios.defaults.timeout = 100000;
// axios.defaults.baseURL = "http://localhost:8080";

/**
 * http request1 拦截器
 */
axios.interceptors.request.use(
    (config) => {
        config.data = JSON.stringify(config.data);
        config.headers = {
            "Content-Type": "application/json",
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * 封装Axios的各种请求
 * @param method
 * @param url
 * @param data
 * @returns {Promise<unknown>}
 */
export function request1(method, url, params = {}) {
    return new Promise((resolve, reject) => {
        let data = {params};
        axios({
            method,
            url,
            ...data
        }).then((response) => {
            resolve(response.data);
        }, (error) => {
            reject(error);
        })
    })
}

