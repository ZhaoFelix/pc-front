<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="2" v-if="roles.includes('1')"
        ><el-button type="success" @click="dialogFormVisible = true"
          >添加</el-button
        ></el-col
      >
      <el-col :span="6">
        <el-input v-model="keyword" placeholder="请输入车牌号"></el-input
      ></el-col>
      <el-col :span="4"
        ><el-button
          :type="isSearch ? 'danger' : 'success'"
          @click="searchByKeyword"
          >{{ isSearch ? "取消" : "搜索" }}</el-button
        ></el-col
      >
    </el-row>

    <!-- TODO：待添加搜索部分的内容 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="margin-top:10px"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="车牌号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.car_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="车辆载重" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.car_load_weight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="车辆尺寸" align="center" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.car_size }}</span>
        </template>
      </el-table-column>
      <el-table-column label="车辆渣土证" align="center">
        <template slot-scope="scope">
          <span>
            {{
              scope.row.car_license_img !== null
                ? scope.row.car_license_img
                : "暂无"
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="车辆渣土证号" align="center">
        <template slot-scope="scope">
          <span>
            {{
              scope.row.car_license_number !== 0
                ? scope.row.car_license_number
                : "暂无"
            }}
          </span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="是否是备车" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.car_is_substitues == 1 ? 'success' : 'danger'"
            >{{ scope.row.car_is_substitues == 1 ? "是" : "否" }}</el-tag
          >
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="车辆运输路线" align="center">
        <template slot-scope="scope">
          <span>
            {{ scope.row.car_router_note }}
          </span>
        </template>
      </el-table-column> -->
      <el-table-column label="添加时间" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.car_created_time | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import { getCarList, getCarListByKeyword } from "@/api/driver";
import { parseTime } from "@/utils";
import { mapGetters } from "vuex";
import Pagination from "@/components/Pagination";
import md5 from "js-md5";
import { callbackify } from "util";
let MD5 = function(pwd) {
  pwd = pwd.toUpperCase();
  pwd = md5(pwd);
  return pwd;
};

export default {
  components: { Pagination },

  data() {
    return {
      list: [],
      listLoading: false,
      total: 0,
      limit: 10,
      page: 1,
      keyword: "",
      existID: 0,
      isSearch: false,
      dialogFormVisible: false,
      temp: {
        admin_name: "",
        admin_login_name: "",
        admin_pwd: "",
        admin_repwd: "",
        admin_type: ""
      },

      imageUrl: "",
      typeList: null,
      listQuery: {
        limit: 10,
        offset: 0,
        status: undefined,
        keyword: ""
      }
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  created() {
    // console.log(this.roles, this.author);
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.list = [];
      this.listQuery.limit = this.limit;
      this.listQuery.offset = (this.page - 1) * this.limit;
      this.listLoading = true;
      getCarList(this.listQuery).then(response => {
        this.list = response.data;
        this.listLoading = false;
        this.total = response.total;
      });
    },
    //  编辑
    handleEdit(row) {
      console.log(row);
    },
    // 撤销
    handleCancel() {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.temp.avatar_url = res.data;
    },
    searchByKeyword() {
      if (this.keyword == "" && !this.isSearch) {
        this.$message("请先输入一个关键字");
      } else if (this.keyword != "" && !this.isSearch) {
        this.isSearch = !this.isSearch;
        getCarListByKeyword({ keyword: this.keyword }).then(response => {
          this.list = response.data;
        });
      } else if (this.isSearch) {
        this.isSearch = !this.isSearch;
        this.fetchData();
        this.keyword = "";
      }
    }
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 89px;
}
</style>
