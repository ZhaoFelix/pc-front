<!--
import { import } from '@babel/types';
import { import } from '@babel/types';
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-01-07 08:21:38
 * @LastEditTime: 2021-04-02 15:35:39
 * @FilePath: /pc-front/src/views/current/map2.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div>
    <Car :mapData="mapObj" :center="center" @changeLoc="changeLoc" />
    <Map
      v-loading="loading"
      @loc="getLocation"
      :center="center"
      :mapData="mapObj"
    />
  </div>
</template>
<script>
import Map from "./components/amap";
import Car from "./components/cars";
import md5 from "js-md5";
import { loc } from "../../config/config.js";
import { parseTime } from "../../utils/index.js";
import { getLocation } from "../../api/map/index.js";
import { parse } from "url";
const center = [121.59996, 31.197646];
const mapObj = {
  positions: [],
  carNumbers: ["沪A63BED"]
};
export default {
  components: { Map, Car },
  data() {
    return {
      loading: true,
      center,
      mapObj
    };
  },
  methods: {
    getLocation(data) {
      //  获取子组件的值
    },
    changeLoc(pos) {
      // this.center = pos;
      this.getLocationByCar();
    },
    getLocationByCar() {
      var timeStamp = parseTime(new Date(), "{y}{m}{d}{h}{i}{s}");

      let code = loc.code;
      let signature = md5(code + timeStamp).toUpperCase();
      let pwd = md5(loc.username + loc.code + timeStamp).toUpperCase();
      let par = {
        code: loc.code,
        version: "2.00",
        timestamp: timeStamp,
        signature: signature,
        action: "vehiclePositonMB",
        userName: loc.username,
        password: pwd,
        sim: "沪B-R7441"
      };
      getLocation(par).then(response => {
        let locObj = response.data[0];
        this.center = [locObj.lon, locObj.lat];

        this.mapObj.positions.push(this.center);
        this.mapObj.positions = [...this.mapObj.positions];
        console.log(response);
      });
    }
  }
};
</script>

<style></style>
