/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-05-24 14:41:17
 * @LastEditTime: 2021-06-02 18:52:57
 * @FilePath: /pc-front/src/api/analysis/index.js
 * Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import request from "@/utils/request";
import { base_path } from "@/config/config";

export function queryAnalysisSale() {
  return request({
    url: `${base_path}analysis/sale`,
    method: "get"
  });
}

export function queryAnalysisTimeSale(params) {
  return request({
    url: `${base_path}analysis/time/sale`,
    method: "get",
    params
  });
}

export function queryAnalysisOrder(params) {
  return request({
    url: `${base_path}analysis/order`,
    method: "get",
    params
  });
}

export function queryAnalysisEstate(params) {
  return request({
    url: `${base_path}analysis/estate`,
    method: "get",
    params
  });
}
