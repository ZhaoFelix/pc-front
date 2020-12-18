/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-18 14:45:39
 * @LastEditTime: 2020-12-18 14:47:41
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
