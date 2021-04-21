/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-11-06 09:52:45
 * @LastEditTime: 2021-04-21 09:38:56
 * @FilePath: /pc-front/src/api/admin/admin.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import request from "@/utils/request";
import { base_path } from "@/config/config";

export function getAdminTypeList() {
  return request({
    url: `${base_path}admin/type/query/all`,
    method: "get"
  });
}

export function queryAdmin() {
  return request({
    url: `${base_path}admin/query/all`,
    method: "get"
  });
}

export function addAdmin(data) {
  return request({
    url: `${base_path}admin/update/add`,
    method: "post",
    data
  });
}

export function queryThirdList() {
  return request({
    url: `${base_path}admin/query/third`,
    method: "get"
  });
}

export function getCashierCodeList() {
  return request({
    url: `${base_path}cashier/code/query/all`,
    method: "get"
  });
}

export function generateCashierCode() {
  return request({
    url: `${base_path}cashier/code/generate`,
    method: "get"
  });
}
