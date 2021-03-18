/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-10-26 13:36:47
 * @LastEditTime: 2021-03-18 10:29:05
 * @FilePath: /pc-front/src/api/user.js
 * Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import request from "@/utils/request";
import { base_path } from "@/config/config";
// 登录
export function login(data) {
  return request({
    url: `${base_path}login/login`,
    method: "post",
    data
  });
}

// 获取用户信息
export function getInfo() {
  return request({
    url: `${base_path}login/info`,
    method: "get"
  });
}

// 登出
export function logout() {
  return request({
    url: `${base_path}login/logout`,
    method: "post"
  });
}
