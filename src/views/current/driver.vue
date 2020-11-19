<template>
  <div>
    <center>
      <table class="cardTable">
      <tr>
        <td>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>司机</span>
              <el-button style="float: right; padding: 3px 0" type="text">展开</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </td>
        <td>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>司机</span>
              <el-button style="float: right; padding: 3px 0" type="text">展开</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </td>
        <td>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>司机</span>
              <el-button style="float: right; padding: 3px 0" type="text">展开</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </td>
      </tr>
      <tr>
        <td>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>司机</span>
              <el-button style="float: right; padding: 3px 0" type="text">展开</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </td>
        <td>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>司机</span>
              <el-button style="float: right; padding: 3px 0" type="text">展开</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </td>
        <td>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>司机</span>
              <el-button style="float: right; padding: 3px 0" type="text">展开</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </td>
      </tr>
    </table>
    </center>
  </div>
</template>

    
<style scoped>
  .cardTable{
    width: 90%;
    margin: 2%;

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
    clear: both
  }

  .box-card {
    width: 400px;
    /* margin: 5%; */
    
    margin-bottom: 5%;
    /* margin-left: 10%; */
    /* margin-right: 10%; */ 
  }
</style>>

