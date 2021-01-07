<!--
import { import } from '@babel/types';
import { import } from '@babel/types';
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-01-07 08:21:38
 * @LastEditTime: 2021-01-07 11:11:21
 * @FilePath: /pc-front/src/views/current/map2.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div>
    <Car />
    <Map @loc="getLocation" />
  </div>
</template>
<script>
import Map from "./components/amap";

import Car from "./components/cars";
export default {
  components: { Map, Car },
  data() {
    return {};
  },
  methods: {
    getLocation(data) {
      //  获取子组件的值
    }
  }
};
</script>

<style></style>
