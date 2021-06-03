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
      default: "LineChart"
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
    }
  },
  data() {
    return {
      chart: null
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
    setOptions({ countData, totalData } = {}) {
      this.chart.setOption({
        title: {
          text: this.title,
          left: "center",
          top: "top"
        },
        legend: {
          data: ["实际收入", "总收入"],
          left: "10%"
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
          left: "0%",
          right: "5%",
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
          },
          splitLine: {
            show: true
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
            data: countData,
            animationDuration: 2800,
            markLine: {
              data: [
                {
                  type: "average",
                  name: "平均值",
                  label: {
                    normal: {
                      position: "end",
                      formatter: "{b}:{c}",
                      color: "black",
                      fontWeight: "bold"
                    }
                  },
                  lineStyle: {
                    width: 1,
                    type: "dashed",
                    dashOffset: 5
                  }
                }
              ]
            }
          },
          {
            name: "总收入",
            itemStyle: {
              normal: {
                color: "#91cc75",
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
            data: totalData,
            animationDuration: 2800,
            markLine: {
              data: [
                {
                  type: "average",
                  name: "平均值",
                  label: {
                    normal: {
                      position: "end",
                      formatter: "{b}:{c}",
                      color: "black",
                      fontWeight: "bold"
                    }
                  },
                  lineStyle: {
                    width: 1,
                    type: "dashed",
                    dashOffset: 5,
                    cap: "round"
                  }
                }
              ]
            }
          }
        ]
      });
    }
  }
};
</script>
