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
                  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
              </el-card>
            </td>
            <td>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>司机</span>
                  
                </div>
                <div v-for="o in 1" :key="o" class="text item">
                  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
              </el-card>
            </td>
            <td>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>司机</span>
                  
                </div>
                <div v-for="o in 1" :key="o" class="text item">
                  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
                  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
              </el-card>
            </td>
            <td>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>司机</span>
                  
                </div>
                <div v-for="o in 1" :key="o" class="text item">
                  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
              </el-card>
            </td>
            <td>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>司机</span>
                  
                </div>
                <div v-for="o in 1" :key="o" class="text item">
                  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
              </el-card>
            </td>
          </tr>
        </table>
        </center>
      </div>
      <br>
    </el-card>


    <el-card class="bgCard">
      <p>空闲中司机：</p>
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
                  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
              </el-card>
            </td>
            <td>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>司机</span>
                  
                </div>
                <div v-for="o in 1" :key="o" class="text item">
                  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
              </el-card>
            </td>
            <td>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>司机</span>
                  
                </div>
                <div v-for="o in 1" :key="o" class="text item">
                  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
                  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
              </el-card>
            </td>
            <td>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>司机</span>
                  
                </div>
                <div v-for="o in 1" :key="o" class="text item">
                  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
              </el-card>
            </td>
            <td>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>司机</span>
                  
                </div>
                <div v-for="o in 1" :key="o" class="text item">
                  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
              </el-card>
            </td>
          </tr>
        </table>
        </center>
      </div>
      <br>
    </el-card>
    
  </div>
  
</template>

    
<style scoped>
  .onMission{
    background: rgb(226, 76, 76);
  }
  .free{
    background: rgb(63, 188, 197);
  }
  .cardTable{
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
    clear: both
  }

  .bgCard{
    margin: 3%;
    width: 95%
  }

  .box-card {
    width: 400px;
    /* margin: 5%; */
    
    margin-bottom: 2%;
    /* margin-left: 10%; */
    /* margin-right: 10%; */ 
  }
</style>>



<script>
  export default {
    data() {
      return {
        data: [{
          label: '信息1',
          children: [{
            label: '二级 1-1',
          }]
        }, {
          label: '信息2',
          children: [{
            label: '二级 1-1',
          }]
        }, {
          label: '信息3',
          children: [{
            label: '二级 1-1',
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
  };
</script>
