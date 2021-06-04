<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "BarChart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    title: {
      type: String,
      required: true
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },
    XData: {
      type: Array,
      required: true
    },
    legendData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      series: []
    };
  },
  watch: {
    chartData: {
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
      this.setOptions(this.chartData);
    },
    setOptions(chartData) {
      let todayOptions = {
        title: {
          text: this.title,
          left: "center",
          top: "top"
        },
        legend: {
          data: this.legendData,
          left: "1%"
        },
        xAxis: {
          data: this.XData.map(item => item.substring(5)),
          boundaryGap: true,
          axisTick: {
            show: false,
            alignWithLabel: true
          }
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "1%",
          top: 40,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: "居民",
            itemStyle: {
              normal: {
                // color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2
                }
              }
            },
            label: {
              show: true,
              position: "top",
              color: "black"
            },
            smooth: true,
            type: "bar",
            data: chartData.usual,
            animationDuration: 2800
          },
          {
            name: "垃圾箱",
            itemStyle: {
              normal: {
                // color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2
                }
              }
            },
            label: {
              show: true,
              position: "top",
              color: "black"
            },
            smooth: true,
            type: "bar",
            data: chartData.box,
            animationDuration: 2800
          },
          {
            name: "商业",
            itemStyle: {
              normal: {
                // color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2
                }
              }
            },
            label: {
              show: true,
              position: "top",
              color: "black"
            },
            smooth: true,
            type: "bar",
            data: chartData.business,
            animationDuration: 2800
          }
        ]
      };
      let weekOptions = {
        title: {
          text: this.title,
          left: "center",
          top: "top"
        },
        legend: {
          data: this.legendData,
          left: "1%"
        },
        xAxis: {
          data: this.XData.map(item => item.substring(5)),
          boundaryGap: true,
          type: "category",
          axisTick: {
            show: false,
            alignWithLabel: true
          }
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "1%",
          top: 40,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: "实际收入",
            itemStyle: {
              normal: {
                // color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2
                }
              }
            },
            label: {
              show: true,
              position: "top",
              color: "black"
            },
            smooth: true,
            type: "bar",
            data: chartData.actual,
            animationDuration: 2800
          },
          {
            name: "总收入",
            itemStyle: {
              normal: {
                // color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2
                }
              }
            },
            label: {
              show: true,
              position: "top",
              color: "black"
            },
            smooth: true,
            type: "bar",
            data: chartData.total,
            animationDuration: 2800
          }
        ]
      };
      this.chart.setOption(
        this.legendData.length == 2 ? weekOptions : todayOptions
      );
    }
  }
};
</script>
