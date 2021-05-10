import { get } from "../utils/request";

/**
 * 分页获取商品信息
 * @param {*} page
 * @returns
 */
export const loadProducts = (page = 1, c = "") =>
  get("/api/v1/products", {
    page,
    product_category: c,
  });

/**
 * 根据id获取详情
 * @param {*} id
 * @returns
 */
export const loadProduct = (id) => get(`/api/v1/products/${id}`);
