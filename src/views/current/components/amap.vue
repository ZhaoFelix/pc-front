<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-01-07 09:31:55
 * @LastEditTime: 2021-01-07 11:19:29
 * @FilePath: /pc-front/src/views/current/components/amap.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="container" style="position:absolute">
    <el-amap class="amap-box" ref="map" vid="amap-vue"> </el-amap>
  </div>
</template>

<script>
import { lazyAMapApiLoaderInstance } from "vue-amap";
import { getLocation } from "./common";
export default {
  name: "Amap",
  data() {
    return {
      map: null,
      zoom: 16,
      zooms: [3, 18],
      center: [121.59996, 31.197646],
      events: {
        init: o => {},
        moveend: () => {},
        zoomchange: () => {},
        click: e => {}
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
  },
  mounted() {
    lazyAMapApiLoaderInstance.load().then(() => {
      // your code ...
      this.map = new AMap.Map("amap-vue", {
        center: this.center,
        zoom: this.zoom,
        zooms: this.zooms
      });
      //   插件相关配置

      var toolBar = new AMap.ToolBar({
        locate: true,
        autoPosition: true,
        liteStyle: true
      });
      this.map.addControl(toolBar);

      // 地图绑定点击事件
      this.map.on("click", e => {
        let loc = getLocation(e);
        this.center = [loc.lng, loc.lat];
        this.$emit("loc", loc);
      });
    });
  }
};
</script>

<style>
.container {
  width: 100%;
  height: 100%;
}
</style>
