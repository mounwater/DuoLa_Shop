import { get } from "../utils/request";

/**
*订单列表
* @param {*} page
* @returns
 */
export const orderLists = (page = 1) =>
  get("/api/v1/orders", {
    page,
  });


/**
*根据id获取订单详情
* @param {*} id
* @returns
*/

export const listDtail = (id) => get(`/api/v1/orders/${id}`);