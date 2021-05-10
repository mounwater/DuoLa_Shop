/**
 * 设置token
 * @param {*} token
 * @returns
 */
export const setToken = (token) => localStorage.setItem("token", token);

/**
 * 获取token
 * @returns
 */
export const getToken = () => localStorage.getItem("token");

/**
 * 删除token
 * @returns
 */
export const removeToken = () => localStorage.removeItem("token");

/**
 * 判断是否登录
 * @returns
 */
export const isLogined = () => {
  if (getToken()) {
    return true;
  }
  return false;
};
