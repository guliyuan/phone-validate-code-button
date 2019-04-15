import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:3000/'
});

AxiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    error => Promise.reject(error),
);

AxiosInstance.interceptors.response.use((response) => {
    // 简单示例 不做过多的处理 
    const { data } = response;
    return data;
}, error => Promise.reject(error));


const AxiosPlugin = {
    install(_Vue) {
        _Vue.mixin({
            created() {
                const self = this;
                self.request = AxiosInstance;
            }
        });
    },
}
export default AxiosPlugin;