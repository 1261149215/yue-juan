<template>
  <div class="container">
    <!-- 查询条件 -->
    <div class="search">
      <div class="choose">
        <span>筛选条件1：</span>
        <el-select v-model="value1" clearable placeholder="请选择" style="width: 200px;" @change="searchData">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span style="margin-left: 40px;">筛选条件2：</span>
        <el-select v-model="value2" clearable placeholder="请选择" style="width: 200px;" @change="searchData">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search_text">
        <el-input
          style="width:200px;margin-left: 40px;"
          placeholder="请输入内容"
          @input="searchData"
          v-model="input4">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>
    <!-- 表格操作 -->
    <div class="btns">
      <el-button type="primary" :disabled="ischoose" @click="deleteLists">选中删除</el-button>
      <div class="addData">
        <div class="add" @click="add">
          <i class="el-icon-plus"></i>
          <h1>添加</h1>
        </div>
        <div class="add" @click="exportData"> 
          <i class="el-icon-folder-add"></i>
          <h1>文件导入</h1>
        </div>
        <el-upload
          ref="uplaodBtn"
          class="upload-demo"
          action=""
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :before-upload="beforeAvatarUpload"
          :on-change="handleChange"
	        :http-request="uploadFile">
          <button id="exportBtn"></button>
        </el-upload>
      </div>
    </div>
    <!-- 表格数据 -->
    <div class="tablediv">
      <el-table
        v-loading="isLoading"
        height="100%"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
        >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="模板名称"
          sortable
          prop="templateName"
          >
        </el-table-column>
        <el-table-column
          label="关联菜单">
          <template slot-scope="scope">
            <div v-if="scope.row.tables">
              <span class="openCode" v-for="(item, index) in scope.row.tablelists" :key="index" @click="openCode(scope.row.id, item)">{{ item | changeMenu}}&emsp;</span>
            </div>
            <div v-else></div>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          sortable>
          <template slot-scope="scope">
            {{ scope.row.createTime | changeTime}}
          </template>
        </el-table-column> 
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页组件 -->
    <div class="page">
      <el-pagination
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request.js"
import { deepCopy, dateFtt } from "@/utils/common.js"
  export default {
    data() {
      return {
        ischoose: true,  // 监听是否有选中列表数据
        current: 1, // 分页 当前页数
        total: 15, // 分页 总页数
        size: 10, // 分页 每页的默认列表数量
        isLoading: false, //表格数据加载
        input4: "", // 搜索 搜索条件存的值
        options1: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
        ], // 筛选条件1 筛选值1
        options2: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],// 筛选条件2 筛选值2
        value1: '', // 筛选值1 选中的值
        value2: '', // 筛选值2 选中的值
        tableData: [
          // {"id":5,"template":"123123","tables":"234235","tablelists":['test','test'],"templateName":"1234","createTime":"2019-10-17T10:40:12"}
        ],// 表格 数据
        file: {}, //上传文件 零时储存文档流
        multipleSelection: [], // 列表选中的 lists
      }
    },
    filters:{
      changeMenu(val){
        if(val == ""){
          return ""
        }else{
          // let a = val.split(",")
          // let str = ""
          // a.map(item =>{
          //   switch(item){
          //     case "test":
          //       str=str+"<a href='#'>操作日志</a>，"
          //       break;
          //     case "bus_teacher":
          //       str=str+"<a>老师信息管理</a>，"
          //       break;
          //     case "bus_student":
          //       str=str+"学生信息管理，"
          //       break;
          //   }
          //   return item
          // })
          // return str.slice(0, -1)
          let str = ""
          switch(val){
            case "test":
              str="操作日志"
              break;
            case "bus_teacher":
              str="老师信息管理"
              break;
            case "bus_student":
              str="学生信息管理"
              break;
          }
          return str
        }
      },
      changeTime(val){
        if(val){
          var date = dateFtt("yyyy-MM-dd hh:mm:ss", val.replace(/T/g, ' '))
          return date
        }else{
          return ""
        }
      },
    },
    watch:{
      // 监听是否有选中表格中的数据
      multipleSelection(val){
        if(val.length > 0){
          this.ischoose = false
        }else{
          this.ischoose = true
        }
      },
    },
    mounted(){
      console.log("kaishi")
      let prams = {
        current: 1,
        size: 10,
      }
      this._getData(prams)
    },
    methods: {
      // 接口方法  ---- 获取表格数据
      async _getData (data) {
        this.isLoading = true;
        const result = await request({
          url: `/comTemplate/list`,
          method: 'post',
          data: data,
        })
        console.log(result)
        if(result.code === 0){
          this.tableData = deepCopy(result.data.records)
          this.total = result.data.total;
          this.tableData = this.tableData.map(item =>{
            if(item.tables){
              item.tablelists = item.tables.split(',')
            }else{
              item.tablelists = []
            }
            return item
          })
        }
        console.log("this.tableData")
        console.log(this.tableData)
        this.isLoading = false;
      },
      // 接口方法  ---- 删除或修改表格数据
      async _saveOrUpdateData (data) {
        const result = await request({
          url: `/comTemplate/saveOrUpdate`,
          method: 'post',
          data: data,
        })
        console.log(result)
        return result
      },
      // 接口方法  ---- 添加表格数据
      async _deleteData (data) {
        const result = await request({
          url: `/comTemplate/delete`,
          method: 'post',
          data: data,
        })
        console.log(result)
        return result
      },
      // 接口方法  ---- 添加表格数据
      async _checkData (id) {
        let url = "/comTemplate/getDataById?id="+id
        const result = await request({
          url: url,
          method: 'post',
        })
        console.log(result)
        return result
      },
      // 通用方法 -------------
      // 打开代码
      openCode(id, table){
        this.$router.push({ name: "model_check", params: { "id": id,  "table": table} });
        // alert("id:"+id+","+"table："+table)
      },
      closeDialog(){
        this.ShowTableTitle = ""
        this.showFullScreen = false
      },
      // 搜索
      searchData(){
        let prams = {
          current: 1,
          size: this.pageSize,
        }
        this._getData(prams)
      },
      // 表格的全选
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      // 选中表格数据监听
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 分页 每页数据量变化
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val
        let prams = {
          current: this.currentPage,
          size: this.pageSize,
        }
        this._getData(prams)
      },
      // 分页 页码变化
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val
        let prams = {
          current: this.currentPage,
          size: this.pageSize,
        }
        this._getData(prams)
      },
      // 数据编辑
      handleEdit(index, row) {
        console.log(index, row);
        this._checkData(row.id).then(res =>{
          if(res.code === 0){
            let id = row.id
            this.$router.push({ name: "model_add", params: { id } });
          }else{
            this.$message({
              type: 'error',
              message: "当前数据已被删除！"
            });
            let prams = {
              current: 1,
              size: this.pageSize,
            }
            this._getData(prams)
          }
        })
      },
      // 添加数据
      add(){
        this.$router.push({ name: "model_add", params: { } });
      },
      // 导入数据
      exportData(){
        $("#exportBtn").click();
      },
      // 导入excel数据上传前校验
      beforeAvatarUpload(file) {
        const isXLS = file.type === 'application/vnd.ms-excel';
        const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isXLS && !isXLSX) {
          this.$refs.uplaodBtn.clearFiles()
          this.file = {}
          this.$message.error('上传文件只能是 .xls 或 .xlsx 格式!');
        }
        // if (!isLt2M) {
        //   this.$refs.uplaodBtn.clearFiles()
        //   this.file = {}
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        return isXLS && isXLSX;
        console.log("beforeAvatarUpload")
      },
      // 上传文件，获取文件流
      handleChange(file) {
        this.file = file.raw
        console.log("handleChange")
      },
      // 自定义上传文档流
      uploadFile() {
        // 创建表单对象
        let form = new FormData();
        form.append("file",this.file)
        console.log("uploadFile")
      },
      // 删除表格中选中的数据
      deleteLists(){
        this.$confirm('确认删除选中列表？', {
          confirmButtonText: '是',
          cancelButtonText: '否'
        }).then(_ => {
            let param = []
            this.multipleSelection.map(item =>{
              param.push(item.id)
              return item
            })
            this._deleteData(param).then(res =>{
              if(res.code === 0){
                this.$message({
                    type: 'success',
                    message: "删除成功！"
                });
                let prams = {
                  current: 1,
                  size: 10,
                }
                this._getData(prams)
              }else{
                this.$message({
                    type: 'error',
                    message: "删除失败！"
                });
              }
            })
          })
          .catch(_ => {});
      },
      // 删除表格数据
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('确认删除？', {
          confirmButtonText: '是',
          cancelButtonText: '否'
        }).then(_ => {
            let param = []
            param.push(row.id)
            this._deleteData(param).then(res =>{
              if(res.code === 0){
                this.$message({
                    type: 'success',
                    message: "删除成功！"
                });
                let prams = {
                  current: 1,
                  size: 10,
                }
                this._getData(prams)
              }else{
                this.$message({
                    type: 'error',
                    message: "删除失败！"
                });
              }
            })
          })
          .catch(_ => {});
      },
    }
  };
</script>
<style lang="scss" scoped>
  .openCode{
    cursor: pointer;
  }
  .openCode:hover{
    color: #409EFF;
  }
</style>
