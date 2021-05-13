<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-11-09 12:49:16
 * @LastEditTime: 2021-05-13 09:52:54
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
    <el-row :gutter="32">
      <el-col :span="8">
        <div class="chart-wrapper">
          <pie-chart
            :tipData="tipData"
            :dataArr="dataArr"
            title="订单类型占比"
          ></pie-chart>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-wrapper">
          <pie-chart
            :tipData="estateData"
            :dataArr="estateDataArr"
            title="物业认证比例"
          ></pie-chart>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-wrapper">
          <pie-chart
            :tipData="driverData"
            :dataArr="driverDataArr"
            title="司机认证比例"
          ></pie-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import { queryWeek, queryOrderRatio, queryEstateRatio } from "@/api/dashboard";
import { request } from "http";
const lineChartData = {
  expectedData: []
};
const XData = [];
export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,
    LineChart,
    PieChart
  },
  data() {
    return {
      lineChartData: lineChartData,
      XData,
      type: "order",
      tipData: ["商业装修", "居民装修", "垃圾箱清运"],
      dataArr: [],
      estateData: ["已认证", "未认证"],
      driverData: ["已认证", "未认证"],
      estateDataArr: [],
      driverDataArr: []
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
      var _this = this;
      queryOrderRatio().then(response => {
        let result = response.data[0];
        Object.keys(result).forEach(function(key) {
          let temp = {
            value: result[key],
            name: key
          };
          _this.dataArr.push(temp);
          console.log(_this.dataArr);
        });
      });
      queryEstateRatio().then(response => {
        let result = response.data[0];
        _this.estateDataArr = [
          {
            value: result["total"] - result["auth_count"],
            name: "未认证"
          },
          {
            value: result["auth_count"],
            name: "已认证"
          }
        ];
      });
      queryEstateRatio({ type: "driver" }).then(response => {
        let result = response.data[0];
        _this.driverDataArr = [
          {
            value: result["total"] - result["auth_count"],
            name: "未认证"
          },
          {
            value: result["auth_count"],
            name: "已认证"
          }
        ];
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
