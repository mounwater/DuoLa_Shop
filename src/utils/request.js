import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 创建一个axios实例
const instance = axios.create({
  baseURL: 'http://localhost:3009',
  timeout: 5000, // 请求超时时间
});

// https://github.com/axios/axios
// 请求的全局拦截
// 全局请求拦截，请求发起之前会执行的一个函数
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    NProgress.start(); // 启动loading
    // 此处设置全局请求拦截的配置信息，可以在这个位置添加请求头
    // Do something before request is sent
    config.headers['authorization'] = `bearer ${sessionStorage.getItem(
      'token'
    )}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 全局响应拦截，请求完成之后会执行的一个函数
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done(); // 删除loading效果
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    NProgress.done();
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.dir(error); //
    // 如果接口返回的状态码是401，跳转到登录页
    if (error.response.status && error.response.status === 401) {
      alert('请登录！');
      window.location.href = '/';
    } else {
      return Promise.reject(error);
    }
  }
);

// config中的params表示url中传递的参数
// export const get = (url, params) => instance.get(url, { params });
export function get(url, params) {
  return instance.get(url, { params });
}

// export function post(url, data) {
//   return instance.post(url, data);
// }

/**
 * 发起一个post请求
 * @param {*} url   请求地址
 * @param {*} data  传递的数据
 * @returns
 */
export const post = (url, data) => instance.post(url, data);

/**
 * 发起一个put请求
 * @param {*} url   请求地址
 * @param {*} data  传递参数
 * @returns
 */
export const put = (url, data) => instance.put(url, data);

/**
 * 发起一个删除请求
 * @param {*} url 请求地址
 * @returns
 */
export const del = (url) => instance.delete(url);
