<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-01-07 09:43:20
 * @LastEditTime: 2021-01-08 10:08:35
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
      </div>
      <div class="divider"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Car"
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
.cell-content span:first-child {
  text-align: left;
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
}
.header-icon {
  font-weight: bold;
  line-height: 20px;
}
.car {
  padding-right: 20px;
}
.status {
  padding-left: 10px;
}
.icon-size {
  width: 15px;
  height: 15px;
  vertical-align: middle;
}
</style>
