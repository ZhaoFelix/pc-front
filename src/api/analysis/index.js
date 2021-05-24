/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-05-24 14:41:17
 * @LastEditTime: 2021-05-24 15:01:34
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
