<!--
import { import } from '@babel/types';
import { import } from '@babel/types';
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-01-07 08:21:38
 * @LastEditTime: 2021-01-08 15:01:48
 * @FilePath: /pc-front/src/views/current/map2.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div>
    <Car />
    <Map
      v-loading="loading"
      @loc="getLocation"
      :center="center"
      :mapData="mapObj"
    />
  </div>
</template>
<script>
import Map from "./components/amap";
import Car from "./components/cars";
const center = [121.59996, 31.197646];
const mapObj = {
  positions: [
    [
      121.59996 + (Math.random() - 0.5) * 0.2,
      31.197646 + (Math.random() - 0.5) * 0.2
    ],
    [
      121.59996 + (Math.random() - 0.5) * 0.2,
      31.197646 + (Math.random() - 0.5) * 0.2
    ],

    [
      121.59996 + (Math.random() - 0.5) * 0.2,
      31.197646 + (Math.random() - 0.5) * 0.2
    ],
    [
      121.59996 + (Math.random() - 0.5) * 0.2,
      31.197646 + (Math.random() - 0.5) * 0.2
    ],
    [
      121.59996 + (Math.random() - 0.5) * 0.2,
      31.197646 + (Math.random() - 0.5) * 0.2
    ],
    [
      121.59996 + (Math.random() - 0.5) * 0.2,
      31.197646 + (Math.random() - 0.5) * 0.2
    ],
    [
      121.59996 + (Math.random() - 0.5) * 0.2,
      31.197646 + (Math.random() - 0.5) * 0.2
    ]
  ],
  carNumbers: [
    "沪A63BED",
    "沪A63BED",
    "沪A63BED",
    "沪A63BED",
    "沪A63BED",
    "沪A63BED",
    "沪A63BED"
  ]
};
export default {
  components: { Map, Car },
  data() {
    return {
      loading: true,
      center,
      mapObj
    };
  },
  methods: {
    getLocation(data) {
      //  获取子组件的值
    }
  }
};
</script>

<style></style>
