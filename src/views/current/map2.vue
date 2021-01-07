<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-01-07 08:21:38
 * @LastEditTime: 2021-01-07 08:48:00
 * @FilePath: /pc-front/src/views/current/map2.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="container" style="position:absolute">
    <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
.container {
  width: 100%;
  height: 100%;
}
</style>
