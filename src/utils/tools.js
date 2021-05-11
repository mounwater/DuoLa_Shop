/**
 * 设置token
 * @param {*} token
 * @returns
 */
export const setToken = (token) => sessionStorage.setItem("token", token);

/**
 * 获取token
 * @returns
 */
export const getToken = () => sessionStorage.getItem("token");

/**
 * 删除token
 * @returns
 */
export const removeToken = () => sessionStorage.removeItem("token");

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
