<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-01-07 09:31:55
 * @LastEditTime: 2021-01-07 14:22:35
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
const exampleComponents = {
  props: ["text"],
  template: `<div>text from  parent: {{text}}</div>`
};
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
      }
    };
  },
  methods: {
    //添加点标记
    loadMarkers() {
      var positions = [
        [116.493195, 39.993253],
        [116.473195, 39.993253],
        [116.453195, 39.993253],
        [116.493195, 39.973253],
        [116.473195, 39.973253],
        [116.453195, 39.973253],
        [116.493195, 39.953253],
        [116.473195, 39.953253],
        [116.453195, 39.953253]
      ];
      var anchor = [
        "bottom-left",
        "bottom-center",
        "bottom-right",
        "middle-left",
        "center",
        "middle-right",
        "top-left",
        "top-center",
        "top-right"
      ];
      var pos_icon = [];
      var pos_marker = [];
      var icon = [];
      var marker = [];
      for (var i = 0; i < positions.length; i++) {
        // 创建一个 Icon
        pos_icon[i] = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(12, 12),
          // 图标的取图地址
          image:
            "//a.amap.com/jsapi_demos/static/demo-center/marker/marker.png",
          // 图标所用图片大小
          imageSize: new AMap.Size(12, 12)
        });
        var labelContent =
          "<div class='labelContent'>anchor:" + anchor[i] + "</div>";
        // 将 Icon 传入 marker
        pos_marker[i] = new AMap.Marker({
          position: positions[i],
          icon: pos_icon[i],
          anchor: "center", //设置锚点
          offset: new AMap.Pixel(0, 0) //设置偏移量
        });
        this.map.add(pos_marker[i]);

        // 创建一个 Icon
        var imageUrl =
          "//a.amap.com/jsapi_demos/static/demo-center/marker/icon.png";
        icon[i] = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(46, 28),
          // 图标的取图地址
          image: imageUrl,
          // 图标所用图片大小
          imageSize: new AMap.Size(46, 28)
        });
        // 将 Icon 传入 marker
        var labelOffset = new AMap.Pixel(-23, -28);
        marker[i] = new AMap.Marker({
          position: positions[i],
          icon: icon[i],
          anchor: anchor[i], //设置锚点
          offset: new AMap.Pixel(0, 0), //设置偏移量
          label: {
            content: labelContent,
            offset: labelOffset
          }
        });
        this.map.add(marker[i]);
      }
    }
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
      this.loadMarkers();
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
