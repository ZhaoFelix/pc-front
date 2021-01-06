/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-01-06 15:26:45
 * @LastEditTime: 2021-01-06 16:23:46
 * @FilePath: /pc-front/src/utils/AMap.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */

export default function MapLoader(key, plugins) {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap);
    } else {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src =
        "https://webapi.amap.com/maps?v=1.4.15&key=" +
        key +
        "key&plugin=" +
        plugins +
        "&callback=initAMap";
      script.onerror = reject;
      document.head.appendChild(script);
    }
    window.initAMap = () => {
      resolve(window.AMap);
    };
  });
}
