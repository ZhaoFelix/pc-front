/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-11-18 13:29:45
 * @LastEditTime: 2021-05-21 09:13:09
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
export function getDriverList(params) {
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

// 关键字查询实时订单
export function queryCurrentByKeyword(params) {
  return request({
    url: `${base_path}operatedOrder/order/queryByKeyword`,
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

//根据关键字查询订单信息
export function getOrderListByKeyword(params) {
  return request({
    url: `${base_path}order/query/queryByKeyword`,
    method: "get",
    params
  });
}

//根据关键字查询订单信息
export function getOrderListByTime(params) {
  return request({
    url: `${base_path}order/query/queryTime`,
    method: "get",
    params
  });
}

//获取异常订单
export function getErrorOrderList(params) {
  return request({
    url: `${base_path}order/query/error`,
    method: "get"
  });
}
