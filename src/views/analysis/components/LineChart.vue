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
    setOptions({ expectedData } = {}) {
      this.chart.setOption({
        title: {
          text: this.title,
          left: "center"
        },
        xAxis: {
          data: this.XData.map(item => item.substring(5)),
          boundaryGap: false,
          axisTick: {
            show: false
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
          }
        },
        legend: {
          data: []
        },
        series: [
          {
            name: "增长量",
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#e6e9f0"
                    },
                    {
                      offset: 1,
                      color: "#eef1f5"
                    }
                  ]),
                  width: 1
                }
              }
            },
            label: {
              show: true
            },
            smooth: true, //是否是平滑曲线
            symbol: "emptyCircle",
            symbolSize: "4",
            type: "line",
            data: expectedData,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#e6e9f0"
                },
                {
                  offset: 1,
                  color: "#eef1f5"
                }
              ])
            },
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
