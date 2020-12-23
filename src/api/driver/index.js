/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-01 07:55:34
 * @LastEditTime: 2020-12-23 15:18:23
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

export function getCarList(params) {
  return request({
    url: `${base_path}car/query/all`,
    method: "get",
    params
  });
}

export function getScheduleList(params) {
  return request({
    url: `${base_path}driver/query/schedule`,
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

// 查询今日值班司机
export function getTodayDriver() {
  return request({
    url: `${base_path}driver/query/today`,
    method: "get"
  });
}
