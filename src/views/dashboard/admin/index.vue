<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-11-09 12:49:16
 * @LastEditTime: 2021-03-30 10:59:45
 * @FilePath: /pc-front/src/views/dashboard/admin/index.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <center>
        <p>
          {{
            type == "wechat"
              ? "最近一周用户增长"
              : type == "order"
              ? "最近一周订单量"
              : "其他"
          }}
        </p>
      </center>
      <div class="chart-wrapper">
        <line-chart :chart-data="lineChartData" :x-data="XData" />
      </div>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import { queryWeek } from "@/api/dashboard";
const lineChartData = {
  expectedData: []
};
const XData = [];
export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: lineChartData,
      XData,
      type: "order"
    };
  },
  methods: {
    handleSetLineChartData(type) {
      console.log(type);
      this.type = type;
      this.fetchData();
    },
    fetchData() {
      queryWeek({ type: this.type }).then(response => {
        let result = response.data;
        let days = [];
        let count = [];
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

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
