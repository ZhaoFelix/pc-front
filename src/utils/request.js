/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-10-26 13:36:47
 * @LastEditTime: 2021-03-25 09:14:26
 * @FilePath: /pc-front/src/utils/request.js
 * Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["Authorization"] = `Bearer ${getToken()}`;
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
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000
      });
      // console.log(res);
      if (res.code === 401) {
        // to re-login
        MessageBox.confirm("Token 失效，请重新登录", "确认退出登录", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || "请求失败"));
    } else {
      return res;
    }
  },
  error => {
    console.log("111");
    console.log(JSON.stringify(error)); // for debug
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
        message = message + "，请联系管理修改。";
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
