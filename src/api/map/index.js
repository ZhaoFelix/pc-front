/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-04-02 08:21:13
 * @LastEditTime: 2021-04-15 14:06:18
 * @FilePath: /pc-front/src/api/map/index.js
 * Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import request from "@/utils/request2";

// 登录
export function getLocation(params) {
  return request({
    url: "/restServer",
    method: "get",
    params
  });
}
