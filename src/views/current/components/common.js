/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-01-07 10:29:28
 * @LastEditTime: 2021-01-07 10:32:43
 * @FilePath: /pc-front/src/views/current/components/common.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
export function getLocation(e) {
  return {
    lng: e.lnglat.getLng(),
    lat: e.lnglat.getLat(),
    value: e.lnglat.getLng() + "," + e.lnglat.getLat()
  };
}
