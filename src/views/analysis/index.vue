<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2021-05-24 13:35:16
 * @LastEditTime: 2021-05-24 15:01:55
 * @FilePath: /pc-front/src/views/analysis/index.vue
 * Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row :gutter="16">
      <el-col :span="24">
        <div class="chart-wrapper">
          <bar-chart
            title="最近30天销售"
            :chart-data="saleLineChartData"
            :x-data="saleXData"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PanelGroup from "./components/PanelGroup";
import BarChart from "./components/BarChart";
import { querySale } from "@/api/dashboard";

const saleLineChartData = {
  countData: [],
  totalData: []
};
const lineChartData = {
  expectedData: []
};
const saleXData = [];
const XData = [];
export default {
  components: {
    BarChart,
    PanelGroup
  },
  data() {
    return {
      saleLineChartData,
      saleXData
    };
  },
  methods: {
    fetchData() {
      querySale({ timeGap: 30 }).then(response => {
        let result = response.data;
        let days = [];
        let count = [];
        let total = [];
        for (var i = 0; i < result.length; i++) {
          let item = result[i];
          days.push(item.days);
          count.push(item.count);
          total.push(item.total);
        }
        this.saleXData = days;
        this.saleLineChartData.countData = count;
        this.saleLineChartData.totalData = total;
      });
    },
    handleSetLineChartData() {
      this.type = type;
      queryWeek({ type: this.type }).then(response => {
        let result = response.data;
        let days = [];
        let count = [];
        let total = [];
        for (var i = 0; i < result.length; i++) {
          let item = result[i];
          days.push(item.days);
          count.push(item.count);
        }
        this.XData = days;
        this.lineChartData.expectedData = count;
      });
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.container {
  padding: 16px;
  background-color: rgb(240, 242, 245);
  position: relative;
  margin: 8px;
}
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 20px;
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
