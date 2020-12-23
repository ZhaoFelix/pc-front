/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-11-18 13:29:45
 * @LastEditTime: 2020-12-23 09:40:21
 * @FilePath: /pc-front/src/api/order/index.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import request from "@/utils/request";
import { base_path } from "@/config/config";

export function getCurrentOrderList(params) {
  return request({
    url: `${base_path}operatedOrder/order/query`,
    method: "get",
    params
  });
}

// 按照路线类型查询当前可指派的司机
export function getCurrentDriverByType(params) {
  return request({
    url: `${base_path}operatedOrder/driver/query`,
    method: "get",
    params
  });
}

export function getCurrentCarByType(params) {
  return request({
    url: `${base_path}operatedOrder/car/query`,
    method: "get",
    params
  });
}

// 调度员取消订单
export function cancelOrderByAdmin(params) {
  return request({
    url: `${base_path}operatedOrder/order/cancel`,
    method: "get",
    params
  });
}

// 指派司机
export function assignDriver(params) {
  return request({
    url: `${base_path}operatedOrder/order/assign`,
    method: "get",
    params
  });
}

// 价格调整
export function assignPrice(data) {
  return request({
    url: `${base_path}order/assignprice`,
    method: "post",
    data
  });
}

// 查询所有订单
export function getOrderAll(params) {
  return request({
    url: `${base_path}order/query/all`,
    method: "get",
    params
  });
}
// 查询订单详情
export function getOrderDetail(params) {
  return request({
    url: `${base_path}order/query/detail`,
    method: "get",
    params
  });
}
