import axios from 'axios';

/*
响应拦截器即异常处理
 */
axios.interceptors.response.use((response) => {
    const { data } = response;
    if (data && data.code === 1000000 ) {
      return data.data;
    }
    if (data && (data.code === '3612002' || data.code === '2411006')) {
      storageManager.nuclear();
      throw Object.assign({
        code: data.code,
        message: '您已经好久没操作过啦！请刷新一下哦！',
        data: null,
      });
    } else {
      const errMsg = data.message || '出错啦！请刷新重试！';
      throw Object.assign({
        code: data.code || 9999998,
        message: errMsg,
        data: null,
      });
    }
  }, error => Promise.reject(error));

  const API_HOST = 'http://0.0.0.0:3000';
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
      },
      post(url, param) {
        return new Promise((resolve, reject) => {
          axios({
            method: 'post',
            url,
            data: param,
          }).then((res) => {
            resolve(res);
          }).catch((err) => {
            reject(err);
          });
        });
      },
}