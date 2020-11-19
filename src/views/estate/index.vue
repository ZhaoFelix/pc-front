<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-input v-model="keyword" placeholder="请输入司机手机号"></el-input
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
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="物业经理人姓名" align="center" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.estate_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物业经理人手机号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.estate_phone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="物业经理人身份证号" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.estate_card_id.replace(
              /^(.{4})(?:\d+)(.{4})$/,
              "$1********$2"
            )
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属公司" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.estate_company }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属物业" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.estate_plot }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属街道居委会" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.estate_region }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否已完成认证" align="center">
        <template slot-scope="scope">
          <el-tag type="scope.row.estate_is_auth==1 ? success : danger">{{
            scope.row.estate_is_auth == 1 ? "已认证" : "未认证"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="绑定的微信号" align="center">
        <template slot-scope="scope">
          <el-tag type="scope.row.wechat_id !=null ? success : danger">{{
            scope.row.wechat_id != null ? "已绑定" : "未绑定"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.estate_created_time | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="绑定微信号时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.estate_wechat_time != null">{{
            scope.row.estate_wechat_time | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
          <el-tag v-else>未绑定微信号</el-tag>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <!-- TODO:待添加用户角色权限 -->
      <el-table-column
        label="操作"
        align="center"
        v-if="roles == 2"
        width="290"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-tooltip
            class="item"
            effect="dark"
            v-if="author == row.admin_id"
            content="密码修改"
            placement="top"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="handleDelete(row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            v-if="author == row.admin_id"
            content="删除"
            placement="top"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="handleDelete(row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
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
import { getEstateList, getEstateListByKeyword } from "@/api/estate";
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
      total: 103,
      limit: 10,
      page: 1,
      keyword: "",
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
      console.log(this.listQuery);
      getEstateList(this.listQuery).then(response => {
        this.list = response.data;
        this.listLoading = false;
        this.total = response.total;
      });
    },
    searchByKeyword() {
      if (this.keyword == "" && !this.isSearch) {
        this.$message("请先输入手机号");
      } else if (this.keyword != "" && !this.isSearch) {
        this.isSearch = !this.isSearch;
        getEstateListByKeyword({ keyword: this.keyword }).then(response => {
          this.list = response.data;
          this.total = this.list.length;
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

<style scoped></style>
