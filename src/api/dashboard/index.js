/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-18 14:45:39
 * @LastEditTime: 2021-05-21 10:10:23
 * @FilePath: /pc-front/src/api/dashboard/index.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import request from "@/utils/request";
import { base_path } from "@/config/config";

export function queryBasic() {
  return request({
    url: `${base_path}dashboard/basic`,
    method: "get"
  });
}

export function queryWeek(params) {
  return request({
    url: `${base_path}dashboard/week`,
    method: "get",
    params
  });
}

export function querySale(params) {
  return request({
    url: `${base_path}dashboard/sale`,
    method: "get",
    params
  });
}

export function queryOrderRatio(params) {
  return request({
    url: `${base_path}dashboard/order/ratio`,
    method: "get",
    params
  });
}

export function queryOrderStatusRatio(params) {
  return request({
    url: `${base_path}dashboard/status/ratio`,
    method: "get",
    params
  });
}

export function queryEstateRatio(params) {
  return request({
    url: `${base_path}dashboard/driver/auth`,
    method: "get",
    params
  });
}
