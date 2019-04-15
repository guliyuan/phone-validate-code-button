import axios from 'axios';

axios.interceptors.response.use((response) => {
    // 简单示例 不做过多的处理 
    const { data } = response;
    return data;
  }, error => Promise.reject(error));

  const API_HOST = 'http://127.0.0.1:3000/';
  axios.defaults.baseURL = API_HOST;
  axios.defaults.timeout = 10000;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  
export default {
    get(url) {
        return new Promise((resolve, reject) => {
          axios({
            method: 'get',
            url
          }).then((res) => {
            resolve(res);
          }).catch((err) => {
            reject(err);
          });
        });
      }
}