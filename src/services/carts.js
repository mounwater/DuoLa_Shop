import { post, get, del } from "../utils/request";

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

export const delCarts = (cartid) => del("api/v1/shop_carts/" + cartid);

export const tjdd = (receiver, regions, address, orderDetails) =>
  post("api/v1/orders", {
    receiver,
    regions,
    address,
    orderDetails,
  });

export const cxaddress = () => get("/api/v1/addresses");
