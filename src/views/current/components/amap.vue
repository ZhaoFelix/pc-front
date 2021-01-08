<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-01-07 09:31:55
 * @LastEditTime: 2021-01-08 15:34:38
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
import carImage from "@/assets/car.png";

export default {
  props: ["center", "mapData"],
  data() {
    return {
      map: null,
      zoom: 16,
      zooms: [10, 18],
      events: {
        init: o => {},
        moveend: () => {},
        zoomchange: () => {},
        click: e => {}
      },
      positions: this.mapData.positions,
      carNumbers: this.mapData.carNumbers,
      childCenter: this.center
    };
  },
  watch: {
    center: function(newVal, oldVal) {
      this.childCenter = newVal;
      this.map.setCenter(this.childCenter);
    }
  },
  methods: {
    //添加点标记
    loadMarkers() {
      var positions = this.positions;
      var anchor = this.carNumbers;
      var pos_icon = [];
      var pos_marker = [];
      var icon = [];
      var marker = [];
      for (var i = 0; i < positions.length; i++) {
        // 创建一个 Icon
        pos_icon[i] = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(30, 30),
          // 图标的取图地址
          image: carImage,
          // 图标所用图片大小
          imageSize: new AMap.Size(30, 30)
        });
        var labelContent = "<div class='labelContent'>" + anchor[i] + "</div>";
        var labelOffset = new AMap.Pixel(-20, -20); // top left
        // 将 Icon 传入 marker
        pos_marker[i] = new AMap.Marker({
          position: positions[i],
          icon: pos_icon[i],
          anchor: "center", //设置锚点
          offset: new AMap.Pixel(0, 0), //设置偏移量
          label: {
            content: labelContent,
            offset: labelOffset
          }
        });
        this.map.add(pos_marker[i]);
      }
    },
    loadMap() {
      lazyAMapApiLoaderInstance.load().then(() => {
        // your code ...
        this.map = new AMap.Map("amap-vue", {
          center: this.childCenter,
          zoom: this.zoom,
          zooms: this.zooms,
          viewMode: "3D", //开启3D视图,默认为关闭
          features: ["bg", "road", "building", "point"],
          mapStyle: "amap://styles/whitesmoke"
        });
        //   插件相关配置
        var toolBar = new AMap.ToolBar({
          locate: true,
          autoPosition: true,
          liteStyle: true,
          position: "LB"
        });
        //   鹰眼插件配置
        this.map.addControl(toolBar);
        var overView = new AMap.OverView({
          isOpen: false,
          visible: true
        });
        this.map.addControl(overView);

        var scale = new AMap.Scale();
        this.map.addControl(scale);

        // 地图绑定点击事件
        this.map.on("click", e => {
          let loc = getLocation(e);
          this.childCenter = [loc.lng, loc.lat];
          this.$emit("loc", loc);
        });
        //   地图加载完成
        this.map.on("complete", () => {
          console.log("地图加载完成");
          this.$parent.loading = false;
          this.loadMarkers();
        });
      });
    }
  },
  mounted() {
    this.loadMap();
  },
  created() {}
};
</script>

<style>
.container {
  width: 100%;
  height: 100%;
}
.amap-marker-label {
  border: none;
  width: 70px;
  text-align: center;
  border-radius: 3px;
  font-size: 11px;
}
</style>
