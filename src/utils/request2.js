/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-10-26 13:36:47
 * @LastEditTime: 2021-04-02 15:21:10
 * @FilePath: /pc-front/src/utils/request2.js
 * Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
import md5 from "js-md5";

// create an axios instance
const service = axios.create({
  baseURL: "/loc", // url = base url + request url
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    let clientType = "web";
    let clientVersion = "2.00";
    let to = md5(clientType + clientVersion);
    if (store.getters.token) {
      config.headers["token"] = to.toUpperCase();
      config.headers["clientType"] = clientType;
      config.headers["clientVersion"] = clientVersion;
    }
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.meta != null) {
      Message({
        message: res.meta.message || "Error",
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(new Error(res.meta.message || "请求失败"));
    } else {
      return res;
    }
  },
  error => {
    let message = error.message || "请求失败";
    if (error.response && error.response.data) {
      const { data } = error.response;
      message = data.message;
      if (data.code === 401) {
        message = message + ", 退出重新登录。";
        store.dispatch("user/resetToken").then(() => {
          location.reload();
        });
      } else {
        message = message + "。出错，请联系开发人员检查。";
      }
    }
    Message({
      message: message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
