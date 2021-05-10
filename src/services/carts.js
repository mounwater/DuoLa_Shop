import { post, get } from "../utils/request";

/**
 * 加入购物车
 * @param {*} product   商品id
 * @param {*} quantity  商品数量
 * @returns
 */
export const addToCart = (product, quantity) =>
  post("/api/v1/shop_carts", {
    product,
    quantity,
  });

/**
 * 获取购物车数据
 * @returns
 */
export const loadCarts = () => get("/api/v1/shop_carts");
