<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col
        :xl="{ span: 1 }"
        :lg="{ span: 2 }"
        :md="{ span: 2 }"
        v-if="roles.includes('1') || roles.includes('2')"
        ><el-button
          type="primary"
          @click="dialogFormVisible = true"
          size="small"
          icon="el-icon-plus"
        ></el-button
      ></el-col>
      <el-col :span="4">
        <el-input
          v-model="keyword"
          placeholder="请输入车牌号"
          size="small"
        ></el-input
      ></el-col>
      <el-col :span="4"
        ><el-button
          :type="isSearch ? 'danger' : 'success'"
          @click="searchByKeyword"
          size="small"
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

      <el-table-column label="添加时间" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.car_created_time | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
        label="操作"
        align="center"
        v-if="roles.includes('1') || roles.includes('2')"
        width="190"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <!-- <el-tooltip class="item" effect="dark" content="修改" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="handleEdit(row)"
            ></el-button>
          </el-tooltip> -->
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
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
    <el-dialog title="修改信息" :visible.sync="dialogVisible" width="20%">
      <el-form ref="edit_info" :model="edit_info" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="edit_info.car_name" width="100px"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="edit_info.car_phone" width="100px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateInfo">立即更新</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 添加司机 -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible" width="25%">
      <el-form
        ref="add_info"
        :rules="rules"
        :model="add_info"
        label-width="80px"
      >
        <el-form-item label="车牌号" prop="car_name">
          <el-input v-model="add_info.car_number" width="100px"></el-input>
        </el-form-item>
        <el-form-item label="所属车队" prop="third_id">
          <el-select v-model="add_info.third_id" placeholder="请选择所属车队">
            <el-option
              v-for="item in thirdTable"
              :key="item.third_id"
              :label="item.third_name"
              :value="item.third_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addCar">立即添加</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCarList,
  getCarListByKeyword,
  getDriverLeader,
  getAddCar,
  getDeleteCar
} from "@/api/driver";
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
      dialogVisible: false,
      thirdTable: [
        {
          third_name: "群欣车队",
          third_id: "0"
        }
      ],
      edit_info: {
        driver_number: "",
        car_phone: ""
      },
      add_info: {
        car_number: "",
        third_id: ""
      },
      rules: {
        car_number: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],

        third_id: [{ required: true, message: "请选择车队", trigger: "blur" }]
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
  watch: {
    dialogFormVisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.fetchcarLeaderList();
        }
      }
    }
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
    },
    handleDelete(row) {
      this.$confirm("删除后将无法进行恢复，是否继续？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          getDeleteCar({ car_id: row.car_id }).then(response => {
            if (response.code == 20000) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.fetchData();
            } else {
              this.$message({
                type: "error",
                message: "删除失败！"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除!"
          });
        });
    },
    handleEdit(row) {
      if (row != null) {
        this.edit_info = row;
        this.dialogVisible = true;
      }
    },

    updateInfo() {
      getEditCar(this.edit_info).then(response => {
        if (response.code == 20000) {
          this.$message({
            type: "success",
            message: "更新成功!"
          });
          this.dialogVisible = false;
          this.fetchData();
        }
      });
    },
    addCar() {
      this.$refs["add_info"].validate(valid => {
        if (valid) {
          getAddCar(this.add_info).then(response => {
            if (response.code == 20000) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.dialogFormVisible = false;
              this.add_info = {
                car_name: "",
                car_phone: "",
                car_card_id: "",
                third_id: ""
              };

              this.fetchData();
            }
          });
        } else {
          this.$message({
            type: "info",
            message: "信息填写不完整!"
          });
        }
      });
    },
    fetchcarLeaderList() {
      this.thirdTable = [
        {
          third_name: "群欣车队",
          third_id: "0"
        }
      ];
      getDriverLeader().then(response => {
        this.thirdTable = this.thirdTable.concat(response.data);
      });
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
