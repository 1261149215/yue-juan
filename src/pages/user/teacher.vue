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
              @selection-change="handleSelectionChange">


        <el-table-column
                type="selection"
                width="55">
        </el-table-column>




                  <el-table-column
                  prop="id"
                  min-width="120"
                  label="主键ID"
                  show-overflow-tooltip>
          </el-table-column>
          <el-table-column
                  prop="userName"
                  min-width="120"
                  label="老师账号"
                  show-overflow-tooltip>
          </el-table-column>
          <el-table-column
                  prop="subjectId"
                  min-width="120"
                  label="学科ID"
                  show-overflow-tooltip>
          </el-table-column>
          <el-table-column
                  prop="stageId"
                  min-width="120"
                  label="学段ID"
                  show-overflow-tooltip>
          </el-table-column>
          <el-table-column
                  prop="roleList"
                  min-width="120"
                  label="角色列表"
                  show-overflow-tooltip>
          </el-table-column>
          <el-table-column
                  prop="password"
                  min-width="120"
                  label="老师密码"
                  show-overflow-tooltip>
          </el-table-column>
          <el-table-column
                  prop="nickname"
                  min-width="120"
                  label="老师昵称，真实姓名"
                  show-overflow-tooltip>
          </el-table-column>
          <el-table-column
                  prop="phone"
                  min-width="120"
                  label="手机号"
                  show-overflow-tooltip>
          </el-table-column>
          <el-table-column
                  prop="email"
                  min-width="120"
                  label="邮箱"
                  show-overflow-tooltip>
          </el-table-column>
          <el-table-column
                  prop="seacId"
                  min-width="120"
                  label="SEAC系统ID"
                  show-overflow-tooltip>
          </el-table-column>
          <el-table-column
                  prop="avatarUrl"
                  min-width="120"
                  label="头像地址"
                  show-overflow-tooltip>
          </el-table-column>
          <el-table-column
                  prop="lastLoginTime"
                  min-width="120"
                  label="最后登录时间"
                  show-overflow-tooltip>
          </el-table-column>
          <el-table-column
                  prop="status"
                  min-width="120"
                  label="用户状态：-1-禁用，0-未激活，1-已激活（正常使用）"
                  show-overflow-tooltip>
          </el-table-column>
          <el-table-column
                  prop="schoolId"
                  min-width="120"
                  label="学校ID"
                  show-overflow-tooltip>
          </el-table-column>
          <el-table-column
                  prop="gmtCreate"
                  min-width="120"
                  label="数据创建时间"
                  show-overflow-tooltip>
          </el-table-column>
          <el-table-column
                  prop="gmtModify"
                  min-width="120"
                  label="数据修改时间"
                  show-overflow-tooltip>
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
    <!-- 弹出层 -->
    <el-dialog
            :title="optionTitle"
            :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">




            <el-form-item label="主键ID" prop="id">
              <el-input v-model="ruleForm.id"></el-input>
            </el-form-item>



            <el-form-item label="老师账号" prop="userName">
              <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>



            <el-form-item label="学科ID" prop="subjectId">
              <el-input v-model="ruleForm.subjectId"></el-input>
            </el-form-item>


            <el-form-item label="学段ID" prop="stageId">
              <el-input v-model="ruleForm.stageId"></el-input>
            </el-form-item>



            <el-form-item label="角色列表" prop="roleList">
              <el-input v-model="ruleForm.roleList"></el-input>
            </el-form-item>




            <el-form-item label="老师密码" prop="password">
              <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>




            <el-form-item label="老师昵称，真实姓名" prop="nickname">
              <el-input v-model="ruleForm.nickname"></el-input>
            </el-form-item>




            <el-form-item label="手机号" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>




            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>



            <el-form-item label="SEAC系统ID" prop="seacId">
              <el-input v-model="ruleForm.seacId"></el-input>
            </el-form-item>



            <el-form-item label="头像地址" prop="avatarUrl">
              <el-input v-model="ruleForm.avatarUrl"></el-input>
            </el-form-item>





            <el-form-item label="最后登录时间" required>
              <el-col :span="11">
                <el-form-item prop="lastLoginTime">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.lastLoginTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>


            <el-form-item label="最后登录时间" prop="lastLoginTime">
              <el-input v-model="ruleForm.lastLoginTime"></el-input>
            </el-form-item>



            <el-form-item label="用户状态：-1-禁用，0-未激活，1-已激活（正常使用）" prop="status">
              <el-input v-model="ruleForm.status"></el-input>
            </el-form-item>


            <el-form-item label="学校ID" prop="schoolId">
              <el-input v-model="ruleForm.schoolId"></el-input>
            </el-form-item>




            <el-form-item label="数据创建时间" required>
              <el-col :span="11">
                <el-form-item prop="gmtCreate">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.gmtCreate" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>


            <el-form-item label="数据创建时间" prop="gmtCreate">
              <el-input v-model="ruleForm.gmtCreate"></el-input>
            </el-form-item>





            <el-form-item label="数据修改时间" required>
              <el-col :span="11">
                <el-form-item prop="gmtModify">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.gmtModify" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>


            <el-form-item label="数据修改时间" prop="gmtModify">
              <el-input v-model="ruleForm.gmtModify"></el-input>
            </el-form-item>




      </el-form>
      <div slot="footer" class="dialog-footer">
        <div v-if="isEditOrAdd">
          <el-button type="primary" @click="submit">添 加</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
        <div v-else>
          <el-button type="primary" @click="submit">修 改</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import request from "@/utils/request.js"
  import { deepCopy } from "@/utils/common.js"
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
          {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },{
            date: '2016-05-07',
            name: '王小虎qwewe',
            address: '上海市普陀区金沙江路 1518 弄'
          },{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },{
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ],// 表格 数据
        file: {}, //上传文件 零时储存文档流
        dialogFormVisible: false, // 是否展示弹出层
        optionTitle: "修改", // 弹出框的标题
        isEditOrAdd: false, // 是添加弹层还是修改弹层 （true：添加，flase：修改）
        multipleSelection: [], // 列表选中的 lists
        ruleForm: {

          id: "",
          userName: "",
          subjectId: "",
          stageId: "",
          roleList: "",
          password: "",
          nickname: "",
          phone: "",
          email: "",
          seacId: "",
          avatarUrl: "",
          lastLoginTime: "",
          status: "",
          schoolId: "",
          gmtCreate: "",
          gmtModify: "",

        }, // 表单数据存储变量

      rules: {

        id: [
          { required: true, message: '请输入！', trigger: 'change' }
        ],
        userName: [
          { required: true, message: '请输入！', trigger: 'change' }
        ],
        subjectId: [
          { required: true, message: '请输入！', trigger: 'change' }
        ],
        stageId: [
          { required: true, message: '请输入！', trigger: 'change' }
        ],
        roleList: [
          { required: true, message: '请输入！', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入！', trigger: 'change' }
        ],
        nickname: [
          { required: true, message: '请输入！', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入！', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入！', trigger: 'change' }
        ],
        seacId: [
          { required: true, message: '请输入！', trigger: 'change' }
        ],
        avatarUrl: [
          { required: true, message: '请输入！', trigger: 'change' }
        ],
        lastLoginTime: [
          { required: true, message: '请输入！', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请输入！', trigger: 'change' }
        ],
        schoolId: [
          { required: true, message: '请输入！', trigger: 'change' }
        ],
        gmtCreate: [
          { required: true, message: '请输入！', trigger: 'change' }
        ],
        gmtModify: [
          { required: true, message: '请输入！', trigger: 'change' }
        ],

      },// 表单数据校验规则
    }
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
      let prams = {
        current: 1,
        size: 10,
      }
      // this._getData(prams)
    },
    methods: {
      // 接口方法  ---- 获取表格数据
      async _getData (data) {
    this.isLoading = true;
    const result = await request({
      url: `/teacher/list`,
      method: 'post',
      data: data,
    })
    console.log(result)
    if(result.code === 0){
      this.tableData = deepCopy(result.data.records)
      this.total = result.data.total;
    }
    this.isLoading = false;
  },
  // 接口方法  ---- 删除或修改表格数据
  async _saveOrUpdateData (data) {
    const result = await request({
      url: `/teacher/saveOrUpdate`,
      method: 'post',
      data: data,
    })
    console.log(result)
    return result
  },
  // 接口方法  ---- 添加表格数据
  async _deleteData (data) {
    const result = await request({
      url: `/teacher/delete`,
      method: 'post',
      data: data,
    })
    console.log(result)
    return result
  },
  // 通用方法 -------------
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
    console.log('每页 '+ val +'条');
    this.pageSize = val
    let prams = {
      current: this.currentPage,
      size: this.pageSize,
    }
    this._getData(prams)
  },
  // 分页 页码变化
  handleCurrentChange(val) {
    console.log('当前页: '+ val );
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
    this.optionTitle = "修改"
    this.isEditOrAdd = false
    this.dialogFormVisible = true
    this.ruleForm = deepCopy(row)
    this.$nextTick(()=>{
      this.$refs.ruleForm.clearValidate()
    })
  },
  // 添加数据
  add(){
    this.optionTitle = "添加"
    this.isEditOrAdd = true
    this.dialogFormVisible = true
    this.ruleForm = {
      date: '',
      name: '',
      address: '',
      date1: '',
      date2: "",
      types: []
    }
    this.$nextTick(()=>{
      this.$refs.ruleForm.clearValidate()
    })
  },
  // 修改或添加提交
  submit(){
    this._saveOrUpdateData(this.ruleForm).then(res =>{
      if (res.code === 0) {
      let msg = ""
      if(this.isEditOrAdd){ //添加数据
        msg="添加成功！"
      }else{//修改数据
        msg="更新成功！"
      }
      this.$message({
        type: 'success',
        message: msg
      });
      let prams = {
        current: 1,
        size: 10,
      }
      this._getData(prams)
      this.dialogFormVisible = false
    } else {
      let msg = ""
      if(this.isEditOrAdd){ //添加数据
        msg="添加失败！"
      }else{//修改数据
        msg="更新失败！"
      }
      this.$message({
        type: 'error',
        message: msg
      });
    }
  })
  },
  // 修改或添加取消
  cancel(){
    this.dialogFormVisible = false
    this.ruleForm = {}
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

</style>
