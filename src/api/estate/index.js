/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-11-12 10:14:40
 * @LastEditTime: 2021-05-07 11:20:01
 * @FilePath: /pc-front/src/api/estate/index.js
 * Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import request from "@/utils/request";
import { base_path } from "@/config/config";

export function getEstateList(params) {
  return request({
    url: `${base_path}estate/query/all`,
    method: "get",
    params
  });
}

export function getEstateListByKeyword(params) {
  return request({
    url: `${base_path}estate/query/queryByKeyword`,
    method: "get",
    params
  });
}

export function getDeleteEstate(params) {
  return request({
    url: `${base_path}estate/update/delete`,
    method: "get",
    params
  });
}
export function getEditEstate(params) {
  return request({
    url: `${base_path}estate/update/edit`,
    method: "get",
    params
  });
}
