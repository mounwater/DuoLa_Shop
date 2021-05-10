import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const instance = axios.create({
  baseURL: 'http://localhost:3009',
  timeout: 5000,
});
/**
 *发起请求
 * @param {*} url
 * @param {*} params url中传递的参数
 * @param {*} data 传递的数据
 * @returns
 */

instance.interceptors.request.use(
  function(config) {
    NProgress.start(); // 启动loading
    // 此处设置全局请求拦截的配置信息，可以在这个位置添加请求头
    // Do something before request is sent
    config.headers['authorization'] = `bearer ${sessionStorage.getItem(
      'token'
    )}`;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 全局响应拦截，请求完成之后会执行的一个函数
// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    //response表示响应到的数据
    NProgress.done(); // 删除loading效果
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    NProgress.done();
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.dir(error); //
    // 如果接口返回的状态码是401，跳转到登录页
    if (error.response.status && error.response.status === 401) {
      // window.location.href = '/';
      console.log(error.response);
    } else {
      return Promise.reject(error);
    }
  }
);

export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const del = (url) => instance.delete(url);
