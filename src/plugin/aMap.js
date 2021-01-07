/*
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-01-07 08:31:35
 * @LastEditTime: 2021-01-07 15:08:11
 * @FilePath: /pc-front/src/plugin/aMap.js
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
 */
import Vue from "vue";
import VueAMap from "vue-amap";
import config from "@/config/config";
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: config.amapKey,
  plugin: [
    "AMap.autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.Circ",
    "AMap.Map3D"
  ],
  v: "1.4.15",
  uiVersion: "1.0.11"
});
