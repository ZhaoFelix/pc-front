<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-01-07 09:31:55
 * @LastEditTime: 2021-01-07 09:34:26
 * @FilePath: /pc-front/src/views/current/components/amap.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="container" style="position:absolute">
    <el-amap
      class="amap-box"
      ref="map"
      vid="amap-vue"
      :zoom="zoom"
      :plugin="plugin"
      :events="events"
    >
    </el-amap>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";

export default {
  name: "Amap",
  data() {
    return {
      map: null,
      zoom: 16,
      AMapManager,
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
        center: new AMap.LngLat(121.59996, 31.197646),
        zoom: this.zoom
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
