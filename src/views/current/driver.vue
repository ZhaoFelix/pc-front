<!--
 * @Author: Felix
 * @Email: felix@qingmaoedu.com
 * @Date: 2020-12-01 07:55:34
 * @LastEditTime: 2020-12-06 16:35:18
 * @FilePath: /pc-front/src/views/current/driver.vue
 * @Copyright © 2019 Shanghai Qingmao Network Technology Co.,Ltd All rights reserved.
-->
<template>
  <div>
    <el-card class="bgCard">
      <p>运输中司机：</p>
      <div>
        <center>
          <table class="cardTable">
            <tr>
              <td>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>司机</span>
                  </div>
                  <div v-for="o in 1" :key="o" class="text item">
                    <el-collapse v-model="activeNames" @change="handleChange">
                      <el-collapse-item title="订单号" name="1">
                        <div>content</div>
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="具体状态" name="2">
                        <div>content</div>
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="实时行程" name="3">
                        <div>
                          <img
                            src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2214980092,2961462071&fm=26&gp=0.jpg"
                          />
                        </div>
                      </el-collapse-item>
                      <el-collapse-item title="联系方式" name="4">
                        <div>content</div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </el-card>
              </td>
              <td>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>司机</span>
                  </div>
                  <div v-for="o in 1" :key="o" class="text item">
                    <el-collapse v-model="activeNames" @change="handleChange">
                      <el-collapse-item title="订单号" name="1">
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="具体状态" name="2">
                        <div>content</div>
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="实时行程" name="3">
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="联系方式" name="4">
                        <div>content</div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </el-card>
              </td>
              <td>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>司机</span>
                  </div>
                  <div v-for="o in 1" :key="o" class="text item">
                    <el-collapse v-model="activeNames" @change="handleChange">
                      <el-collapse-item title="订单号" name="1">
                        <div>content</div>
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="具体状态" name="2">
                        <div>content</div>
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="实时行程" name="3">
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="联系方式" name="4">
                        <div>content</div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </el-card>
              </td>
            </tr>
            <tr>
              <td>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>司机</span>
                  </div>
                  <div v-for="o in 1" :key="o" class="text item">
                    <el-collapse v-model="activeNames" @change="handleChange">
                      <el-collapse-item title="订单号" name="1">
                        <div>content</div>
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="具体状态" name="2">
                        <div>content</div>
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="实时行程" name="3">
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="联系方式" name="4">
                        <div>content</div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </el-card>
              </td>
              <td>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>司机</span>
                  </div>
                  <div v-for="o in 1" :key="o" class="text item">
                    <el-collapse v-model="activeNames" @change="handleChange">
                      <el-collapse-item title="订单号" name="1">
                        <div>content</div>
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="具体状态" name="2">
                        <div>content</div>
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="实时行程" name="3">
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="联系方式" name="4">
                        <div>content</div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </el-card>
              </td>
              <td>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>司机</span>
                  </div>
                  <div v-for="o in 1" :key="o" class="text item">
                    <el-collapse v-model="activeNames" @change="handleChange">
                      <el-collapse-item title="订单号" name="1">
                        <div>content</div>
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="具体状态" name="2">
                        <div>content</div>
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="实时行程" name="3">
                        <div>content</div>
                      </el-collapse-item>
                      <el-collapse-item title="联系方式" name="4">
                        <div>content</div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </el-card>
              </td>
            </tr>
          </table>
        </center>
      </div>
      <br />
    </el-card>
  </div>
</template>

<style scoped>
.onMission {
  background: rgb(226, 76, 76);
}
.free {
  background: rgb(63, 188, 197);
}
.cardTable {
  width: 97%;
  margin: 1%;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
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
  margin: 3%;
  width: 95%;
}

.box-card {
  width: 400px;
  /* margin: 5%; */

  margin-bottom: 2%;
  /* margin-left: 10%; */
  /* margin-right: 10%; */
}</style
>>

<script>
export default {
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>
