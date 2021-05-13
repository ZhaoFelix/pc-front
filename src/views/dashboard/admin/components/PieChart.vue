<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-05-12 19:02:04
 * @LastEditTime: 2021-05-13 09:38:41
 * @FilePath: /pc-front/src/views/dashboard/admin/components/PieChart.vue
 * Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->

<template>
  <div :class="className" :style="{ height, width }"></div>
</template>

<script>
import echarts from "echarts";

require("echarts/theme/macarons"); // echarts theme

export default {
  name: "PieChart",
  props: {
    className: {
      type: String,
      default: "chart"
    },
    title: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    },
    tipData: {
      type: Array,
      required: true
    },
    dataArr: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    dataArr: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  // 每次销毁前清空
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.dataArr, this.tipData);
    },
    setOptions(dataArr, tipData) {
      this.chart.setOption({
        title: {
          text: this.title,
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: tipData
        },
        series: [
          {
            name: this.title,
            type: "pie",
            radius: "55%",
            // center: ["50%", "60%"],
            data: dataArr,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style scoped></style>
