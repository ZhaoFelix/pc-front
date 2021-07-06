<template>
  <el-row :gutter="16" class="panel-group">
    <el-row class="segment-style">
      <el-col :xs="{span: 12, offset: 6}" :sm="{span: 12, offset: 6}" :lg="{span: 8, offset: 8}" >
        <div class="div-center">
                <el-radio-group
                  v-model="selectRadio"
                  size="small"
                  @change="selectedChange"
                >
                  <el-radio-button label="1">截止目前</el-radio-button>
                  <el-radio-button label="2">本周</el-radio-button>
                  <el-radio-button label="3">上周</el-radio-button>
                  <el-radio-button label="4">本月</el-radio-button>
                  <el-radio-button label="5">上月</el-radio-button>
                  <el-radio-button label="6">最近六个月</el-radio-button>
                </el-radio-group>
              </div>
      </el-col>
    </el-row>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            居民装修
          </div>
          <count-to
            :start-val="0"
            :end-val="basicData.usual"
            :duration="2600"
            :decimals="2"
            class="card-panel-num"
          />
          <span class="card-panel-num">/</span>
          <count-to
            :start-val="0"
            :end-val="basicData.usual_total"
            :duration="2600"
            :decimals="2"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            商业装修
          </div>
          <count-to
            :start-val="0"
            :end-val="basicData.business"
            :duration="3200"
            :decimals="2"
            class="card-panel-num"
          />
          <span class="card-panel-num">/</span>
          <count-to
            :start-val="0"
            :end-val="basicData.business_total"
            :duration="3200"
            :decimals="2"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            垃圾箱清运
          </div>
          <count-to
            :start-val="0"
            :end-val="basicData.box"
            :duration="3600"
            :decimals="2"
            class="card-panel-num"
          />
          <span class="card-panel-num">/</span>
          <count-to
            :start-val="0"
            :end-val="basicData.box_total"
            :duration="3600"
            :decimals="2"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总计
          </div>
          <count-to
            :start-val="0"
            :end-val="basicData.total"
            :duration="3000"
            :decimals="2"
            class="card-panel-num"
          />
          <span class="card-panel-num">/</span>
          <count-to
            :start-val="0"
            :end-val="basicData.actual_total"
            :duration="3000"
            :decimals="2"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";
import { queryAnalysisSale } from "@/api/analysis";
export default {
  components: {
    CountTo
  },
  data() {
    return {
      basicData: {},
      selectRadio:1,
    };
  },
  methods: {
    fetchData() {
      queryAnalysisSale({selectedRadio:this.selectRadio}).then(response => {
        this.basicData = response.data[0];
      });
    },
    selectedChange() {
      console.log(this.selectRadio)
      // 选中后更新数据
      this.fetchData()
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 4px;

  .card-panel-col {
    margin-bottom: 20px;
  }
  .div-center {
    text-align: center;
  }
  .segment-style {
    line-height: 48px;
    background: #fff;
    margin-bottom: 8px;
    margin-left: 8px;
    margin-right: 8px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
