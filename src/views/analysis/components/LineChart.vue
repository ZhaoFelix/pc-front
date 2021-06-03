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
      chart: null,
      chartOptions: {
        isShowLabel: false,
        isSmooth: true
      }
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
    setOptions({
      totalData,
      usualData,
      secondData,
      businessData,
      boxData
    } = {}) {
      this.chart.setOption({
        title: {
          text: this.title,
          left: "center"
        },
        legend: {
          data: ["总计", "居民", "商业", "二次", "垃圾箱"],
          left: "10%"
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

        series: [
          {
            name: "总计",
            stack: "总计",
            label: {
              show: !this.chartOptions.isShowLabel
            },
            smooth: this.chartOptions.isSmooth, //是否是平滑曲线
            symbol: "emptyCircle",
            symbolSize: "4",
            type: "line",
            emphasis: {
              focus: "series"
            },
            data: totalData,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(128, 255, 165)"
                },
                {
                  offset: 1,
                  color: "rgba(1, 191, 236)"
                }
              ])
            },

            lineStyle: {
              width: 0
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
          },
          {
            name: "居民",
            label: {
              show: this.chartOptions.isShowLabel
            },
            lineStyle: {
              width: 0
            },
            smooth: this.chartOptions.isSmooth, //是否是平滑曲线
            symbol: "emptyCircle",
            symbolSize: "4",
            type: "line",
            data: usualData,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0, 221, 255)"
                },
                {
                  offset: 1,
                  color: "rgba(77, 119, 255)"
                }
              ])
            },
            emphasis: {
              focus: "series"
            }
          },
          {
            name: "商业",
            label: {
              show: this.chartOptions.isShowLabel
            },
            lineStyle: {
              width: 0
            },
            smooth: this.chartOptions.isSmooth, //是否是平滑曲线
            symbol: "emptyCircle",
            symbolSize: "4",
            type: "line",
            data: businessData,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(55, 162, 255)"
                },
                {
                  offset: 1,
                  color: "rgba(116, 21, 219)"
                }
              ])
            },
            emphasis: {
              focus: "series"
            }
          },
          {
            name: "二次",
            label: {
              show: this.chartOptions.isShowLabel
            },
            lineStyle: {
              width: 0
            },
            smooth: this.chartOptions.isSmooth, //是否是平滑曲线
            symbol: "emptyCircle",
            symbolSize: "4",
            type: "line",
            data: secondData,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255, 0, 135)"
                },
                {
                  offset: 1,
                  color: "rgba(135, 0, 157)"
                }
              ])
            },
            emphasis: {
              focus: "series"
            }
          },
          {
            name: "垃圾箱",
            label: {
              show: this.chartOptions.isShowLabel
            },
            lineStyle: {
              width: 0
            },
            smooth: this.chartOptions.isSmooth, //是否是平滑曲线
            symbol: "emptyCircle",
            symbolSize: "4",
            type: "line",
            data: boxData,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255, 191, 0)"
                },
                {
                  offset: 1,
                  color: "rgba(224, 62, 76)"
                }
              ])
            },
            emphasis: {
              focus: "series"
            }
          }
        ]
      });
    }
  }
};
</script>
