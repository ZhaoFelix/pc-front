<!--
import { import } from '@babel/types';
import { import } from '@babel/types';
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-01-07 08:21:38
 * @LastEditTime: 2021-01-07 09:44:57
 * @FilePath: /pc-front/src/views/current/map2.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div>
    <Car />
    <Map />
  </div>
</template>
<script>
import Map from "./components/amap";

import Car from "./components/cars";
export default {
  components: { Map, Car }
};
</script>

<style></style>
