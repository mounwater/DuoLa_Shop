import { post } from "../utils/request";

/**
 * 用户登录
 * @param {*} data
 * @returns
 */
export const login = (data) => post("/api/v1/auth/login", data);

/**
 * 用户注册
 * @param {*} data
 * @returns
 */
export const reg = (data) => post("/api/v1/auth/reg", data);




/**
*订单详情
* @param {*} data
* @returns
 */
export const orderdetail = (data) => post("/api/v1/auth/orderdetail", data);