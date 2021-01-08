<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-01-07 09:43:20
 * @LastEditTime: 2021-01-08 10:31:34
 * @FilePath: /pc-front/src/views/current/components/cars.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="car-list">
    <div class="cell-header">
      <h4>车辆列表</h4>
      <div class="header-icon">
        <span class="car">
          <span style="padding-right:4px">车辆</span>
          <img src="../../../assets/car.png" class="icon-size" />
        </span>
        <span class="status">
          <span style="padding-right:4px">状态</span>
          <img src="../../../assets/status.png" class="icon-size" />
        </span>
        <span class="location">
          <span style="padding-right:4px">位置</span>
          <img src="../../../assets/location.png" class="icon-size" />
        </span>
      </div>
    </div>
    <div class="cell" v-for="i in 20" :key="i">
      <div class="cell-content">
        <span class="car-number">沪A677B3</span>
        <span class="car-status">
          <el-tag size="mini" effect="dark" type="danger" v-if="i % 2 == 0"
            >运输</el-tag
          >
          <el-tag size="mini" effect="dark" v-else>空闲</el-tag>
        </span>
        <span class="cell-location" @click="carLocation">
          <img src="../../../assets/location.png" class="icon-size" />
        </span>
      </div>
      <div class="divider"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Car",
  methods: {
    carLocation() {
      console.log("车辆位置信息");
    }
  }
};
</script>

<style scoped>
.car-list {
  position: fixed;
  right: 10px;
  top: 60px;
  z-index: 100;
  background-color: white;
  text-align: center;
  border-radius: 4px;
}
.cell {
  padding: 4px 8px;
}
.cell-content {
  text-align: left;
}
.cell-location {
  padding-left: 45px;
}
.divider {
  height: 1px;
  background-color: rgba(1, 1, 1, 0.05);
  margin-top: 8px;
}
.car-number {
  padding-right: 20px;
}
.car-status {
  padding-left: 10px;
  font-size: 11px;
}
.header-icon {
  font-weight: bold;
  line-height: 20px;
  padding-bottom: 4px;
  font-size: 13px;
}
.car {
  width: 60px;
  padding-left: 8px;
  padding-right: 20px;
  text-align: center;
}
.status {
  padding-left: 10px;
  padding-right: 20px;
}
.location {
  padding-left: 10px;
  padding-right: 8px;
}
.icon-size {
  width: 15px;
  height: 15px;
  vertical-align: middle;
}
</style>
