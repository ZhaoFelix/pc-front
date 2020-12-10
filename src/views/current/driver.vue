<!--
import { import } from '@babel/types';
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-01 07:55:34
 * @LastEditTime: 2020-12-10 14:42:56
 * @FilePath: /pc-front/src/views/current/driver.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div>
    <el-card class="bgCard">
      <p>运输中司机：</p>
      <div>
        <el-card class="cardTable" v-for="(item, index) in list" :key="index">
          <div slot="header" class="clearfix">
            <span>{{ "订单号：" + item.order_number }}</span>
            <span class="order-status">{{
              item.order_status == 6 ? "已完成" : "进行中"
            }}</span>
          </div>
          <div v-for="o in 1" :key="o" class="text item">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="用户信息" name="1">
                <div>
                  <span class="title-style">
                    用户名：
                  </span>
                  <span>
                    {{ item.order_user_name }}
                  </span>
                </div>
                <div>
                  <span class="title-style">
                    订单地址：
                  </span>
                  <span>
                    {{ item.user_address }}
                  </span>
                </div>
                <div>
                  <span class="title-style">渣土图片:</span>
                  <center>
                    <viewer :images="[]">
                      <img
                        v-for="(item, index) in JSON.parse(
                          item.user_place_order_img
                        )"
                        :key="index"
                        :src="item.url"
                        alt=""
                        class="image-thumb"
                      />
                    </viewer>
                  </center>
                </div>
              </el-collapse-item>
              <el-collapse-item title="司机信息" name="2">
                <div>
                  <span class="title-style">
                    司机姓名：
                  </span>
                  <span>
                    {{ item.driver_name }}
                  </span>
                </div>
                <div>
                  <span class="title-style">
                    车牌号：
                  </span>
                  <span>
                    {{ item.car_number }}
                  </span>
                </div>
                <div>
                  <span class="title-style">
                    司机电话：
                  </span>
                  <span>
                    {{ item.driver_phone }}
                  </span>
                </div>
              </el-collapse-item>
              <el-collapse-item title="实时行程" name="3">
                <div v-if="item.driver_reach_img != null">
                  <span class="title-style">渣土现场:</span>
                  <center>
                    <viewer :images="[]">
                      <img
                        v-for="(item, index) in JSON.parse(
                          item.user_place_order_img
                        )"
                        :key="index"
                        :src="item.url"
                        alt=""
                        class="image-thumb"
                      />
                    </viewer>
                  </center>
                  <span class="title-style">处理时间：</span>
                  <span>2020-12-23 14:00:00</span>
                </div>
                <div v-if="item.driver_reach_img != null" class="divider"></div>
                <div v-if="item.driver_get_img != null">
                  <span class="title-style">渣土装车:</span>
                  <center>
                    <viewer :images="[]">
                      <img
                        v-for="(item, index) in JSON.parse(
                          item.user_place_order_img
                        )"
                        :key="index"
                        :src="item.url"
                        alt=""
                        class="image-thumb"
                      />
                    </viewer>
                  </center>
                  <span class="title-style">处理时间：</span>
                  <span>2020-12-23 14:00:00</span>
                </div>
                <div class="divider"></div>
                <div v-if="item.driver_complete_img != null">
                  <span class="title-style">渣土倾倒:</span>
                  <center>
                    <viewer :images="[]">
                      <img
                        v-for="(item, index) in JSON.parse(
                          item.user_place_order_img
                        )"
                        :key="index"
                        :src="item.url"
                        alt=""
                        class="image-thumb"
                      />
                    </viewer>
                  </center>
                  <span class="title-style">处理时间：</span>
                  <span>2020-12-23 14:00:00</span>
                </div>
              </el-collapse-item>
              <!-- <el-collapse-item title="联系方式" name="4">
                <div>content</div>
              </el-collapse-item> -->
            </el-collapse>
          </div>
        </el-card>
      </div>
      <br />
    </el-card>
  </div>
</template>
<script>
import { getonGoingDriver } from "@/api/driver";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    fetchData() {
      getonGoingDriver().then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    handleChange(val) {
      console.log(val);
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
.cardTable {
  width: 25%;
  margin: 1%;
}
.text {
  font-size: 14px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.bgCard {
  margin: 1%;
  width: 98%;
}

.image-thumb {
  width: 25%;
  height: 80px;
  padding: 5px;
}

.title-style {
  font-weight: bold;
}

.divider {
  height: 1px;
  background: rgb(0, 0, 0, 0.05);
  width: 100%;
  margin: 8px 0;
}

.order-status {
  float: right;
  color: red;
}
</style>
