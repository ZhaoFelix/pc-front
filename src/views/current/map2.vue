<!--
import { import } from '@babel/types';
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-01-07 08:21:38
 * @LastEditTime: 2021-01-07 09:08:26
 * @FilePath: /pc-front/src/views/current/map2.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="container" style="position:absolute">
    <el-amap
      class="amap-box"
      ref="map"
      :vid="'amap-vue'"
      :amap-manager="amapManger"
      :center="center"
      :zoom="zoom"
      :plugin="plugin"
      :events="events"
    >
    </el-amap>
  </div>
</template>

<script>
import { AMapManager } from "vue-amap";

export default {
  data() {
    return {
      zoom: 16,
      center: [121.59996, 31.197646],
      events: {
        init: o => {
          console.log(o.getCenter());
          console.log(this.$refs.map.$$getInstance());
          o.getCity(result => {
            console.log(result);
          });
        },
        moveend: () => {},
        zoomchange: () => {},
        click: e => {
          alert("map clicked");
        }
      },
      plugin: [
        "ToolBar",
        {
          pName: "MapType",
          defaultType: 0,
          events: {
            init(o) {
              console.log(o);
            }
          }
        }
      ]
    };
  }
};
</script>

<style>
.container {
  width: 100%;
  height: 100%;
}
</style>
