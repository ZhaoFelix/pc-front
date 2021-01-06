<!--
import { import } from '@babel/types';
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-01-06 14:15:27
 * @LastEditTime: 2021-01-06 16:53:01
 * @FilePath: /pc-front/src/views/current/map.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div id="map" style="position:absolute"></div>
</template>

<script>
import AMap from "@/utils/AMap";
import config from "@/config/config";
export default {
  name: "Amap",
  data() {
    return {
      map: null,
      resMap: null,
      location: {
        lan: 121.462503,
        lat: 30.948094
      },
      plugins: ["AMap.Geocoder"],
      key: config.mapKey
    };
  },
  methods: {
    async initAmap() {
      try {
        this.resMap = await AMap(this.key, this.plugins);
        this.map = new this.resMap.Map("map", {
          resizeEnable: true, //是否监控地图容器尺寸变化
          zooms: [6, 19], //设置地图级别范围
          zoom: 12, //初始化地图层级
          zoomEnable: true, // 是否缩放
          scrollWheel: true, // 是否支持滚轮缩放
          dragEnable: true, // 是否支持鼠标拖拽平移
          jogEnable: true, // 是否支持缓动效果
          buildingAnimation: true, // 模块消失是否有动画效果
          center: [this.location.lan, this.location.lat] //初始化地图中心点
        });
        this.resMap.plugin("AMap.TooBar", function() {
          var toolBar = this.resMap.ToolBar();
          this.resMap.addControl(toolBar);
        });

        this.addMarker();
        this.drawRouterPath();
      } catch (err) {
        console.error(err);
      }
    },
    // 添加标记点
    addMarker() {
      this.marker = new this.resMap.Marker({
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [this.location.lan - 0.1, this.location.lat - 0.1],
        offset: new this.resMap.Pixel(-13, -30)
      });
      this.map.add(this.marker);
      this.map.setFitView();
    },
    //绘制路径
    drawRouterPath() {}
  },

  created: {},
  mounted() {
    this.initAmap();
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
