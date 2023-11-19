/**
 * 网络请求配置
 */
import axios from "axios";
import { API_SERVER } from "../config/constant";

let token = localStorage.getItem("token");

axios.defaults.timeout = 100000;

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
    (request) => {
        //如果是文件上传
        const config = request.config;
        const isFileUpload = config && (config.isFileUpload || null);
        const isFileDownload = config && (config.isFileDownload || null);

        if (isFileUpload != null && isFileUpload) {
            request.headers = {
                "Content-Type": "multipart/form-data",
            };
        } else if (isFileDownload != null && isFileDownload) {
            request.data = JSON.stringify(request.data);
            request.responseType = "blob";
            request.headers = {
                "Content-Type": "application/json",
            };
        } else {
            //如果是非文件上传
            console.log("上传的数据1", request.data)
            request.data = JSON.stringify(request.data);
            console.log("上传的数据2", request.data)
            request.headers = {
                "Content-Type": "application/json",
                //
            };
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * 封装发送给Java后端Axios的各种请求
 * @param method
 * @param url
 * @param data
 * @returns {Promise<unknown>}
 */
export function request(method, url, params = {}, config) {
    return new Promise((resolve, reject) => {
        let data = {};
        if (method === 'GET') {
            data = {params};
        } else {
            data = {data: params};
        }
        console.log("DATA", data);
        axios({
            method,
            url: API_SERVER + url,
            ...data,
            config
        }).then((response) => {
            const isFileDownload = config && config.isFileDownload || null;
            if (isFileDownload != null && isFileDownload) {
                resolve(response);
            } else {
                resolve(response.data);
            }
        }, (error) => {
            reject(error);
        })
    })
}
