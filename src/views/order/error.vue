<template>
  <div class="app-container">
    <p>异常订单信息</p>
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
      <!-- <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column> -->
      <el-table-column align="center" label="ID" width="60">
        <template>index</template>
      </el-table-column>

      <el-table-column label="订单司机" align="center" width="110">
        <template>
          <span>司机</span>
        </template>
      </el-table-column>


      <el-table-column label="订单号" align="center" width="300">
        <template>
          <span>订单号</span>
        </template>
      </el-table-column>

      <el-table-column label="订单简述" align="center">
        <template>
          <span>订单简述</span>
        </template>
      </el-table-column>
      

      <el-table-column label="订单状态" align="center" width="110">
        <template slot-scope="scope">
          <el-tag type="scope.row.wechat_id !=null ? success : danger">{{
            scope.row.wechat_id != null ? "已处理" : "异常"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="订单时间" align="center" width="200">
        <template slot-scope="scope">
          <span>{{
            scope.row.estate_created_time | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>

      
      <!-- <el-table-column label="所属街道居委会" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.estate_region }}</span>
        </template>
      </el-table-column> -->

      
      
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
import { getEstateList } from "@/api/estate";
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
      total: 9,
      limit: 10,
      page: 1,
      keyword: "",
      existID: 0,

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
