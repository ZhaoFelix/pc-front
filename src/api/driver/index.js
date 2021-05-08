/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-01 07:55:34
 * @LastEditTime: 2021-05-08 09:18:15
 * @FilePath: /pc-front/src/api/driver/index.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import request from "@/utils/request";
import { base_path } from "@/config/config";

export function getDriverList(params) {
  return request({
    url: `${base_path}driver/query/all`,
    method: "get",
    params
  });
}

// 查询车队长列表
export function getDriverLeader() {
  return request({
    url: `${base_path}driver/query/third`,
    method: "get"
  });
}

// 订单分配
export function setDriverLeader(params) {
  return request({
    url: `${base_path}driver/update/third`,
    method: "get",
    params
  });
}

export function getCarList(params) {
  return request({
    url: `${base_path}car/query/all`,
    method: "get",
    params
  });
}

export function getCarListByKeyword(params) {
  return request({
    url: `${base_path}car/query/queryByKeyword`,
    method: "get",
    params
  });
}

export function getDriverListByKeyword(params) {
  return request({
    url: `${base_path}driver/query/queryByKeyword`,
    method: "get",
    params
  });
}

export function getonGoingDriver() {
  return request({
    url: `${base_path}ongoing/driver`,
    method: "get"
  });
}

export function getDeleteDriver(params) {
  return request({
    url: `${base_path}driver/update/delete`,
    method: "get",
    params
  });
}
export function getEditDriver(params) {
  return request({
    url: `${base_path}driver/update/edit`,
    method: "get",
    params
  });
}

export function getAddDriver(params) {
  return request({
    url: `${base_path}driver/insert/add`,
    method: "get",
    params
  });
}
