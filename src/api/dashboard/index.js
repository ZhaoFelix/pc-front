/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-18 14:45:39
 * @LastEditTime: 2021-03-30 10:46:25
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
