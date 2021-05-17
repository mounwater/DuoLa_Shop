import { get } from "../utils/request";

/**
 * 根据id删除订单
 * @returns
 */

export const oneDel = (id) => get(`/api/v1/orders/${id}`)