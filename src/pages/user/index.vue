<template>
    <div class="container">
        <div class="search">
            <div class="choose">
                <span>系统角色：</span>
                <el-select v-model="roleName" clearable  placeholder="请选择角色"  style="width: 200px;" @change="searchData" >
                    <el-option v-for="item in rolesList" :key="item.value" :label="item.label"  :value="item.label"></el-option>
                </el-select>
                <span style="margin-left: 40px;">地区：</span>
                <el-select v-model="provinceId" clearable placeholder="请选择地区" style="width: 200px;" @change="provinceChange" >
                    <el-option v-for="item in provinceList"  :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"  ></el-option>
                </el-select>
                <span style="margin-left: 40px;">学校：</span>
                <el-select
                    v-model="schoolId"
                    clearable
                    filterable
                    :filter-method="getSchoolList"
                    @clear="getSchoolList"
                    placeholder="请选择学校"
                    style="width: 200px;"
                    @change="searchData"
                >
                    <el-option  v-for="item in schoolList" :key="item.id" :label="item.schoolName"  :value="item.id" ></el-option>
                </el-select>
                <el-input
                    style="width:200px;margin-left: 40px;"
                    placeholder="请输入姓名或用户名"
                    @change="searchData"
                    v-model="search"
                    clearable
                >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
        </div>
       <!-- 表格操作 -->
        <div class="btns">
            <!-- <el-button type="primary" :disabled="ischoose" @click="deleteLists">选中删除</el-button> -->
            <div class="addData">
                <div class="add" @click="add">
                <i class="el-icon-plus"></i>
                <h1>添加</h1>
                </div>
            </div>
        </div>
        <!-- 表格数据 -->
        <div class="tablediv">
            <el-table
                v-loading="isLoading"
                height="100%"
                ref="multipleTable"
                border
                :data="tableData"
                :span-method="arraySpanMethod"
                tooltip-effect="dark"
                style="width: 100%;"
               
            >
                <el-table-column prop="index"  width="55" label="序号" align="center"></el-table-column>
                <el-table-column prop="id" min-width="100" label="编号" align="center"></el-table-column>
                <el-table-column prop="realName" min-width="80" label="姓名" align="center"></el-table-column>
                <el-table-column prop="name" min-width="120" label="账号" align="center"></el-table-column>
                <el-table-column prop="mobile" min-width="120" label="手机号" align="center"></el-table-column>
                <el-table-column prop="roleName" min-width="120" label="系统角色" align="center"></el-table-column>
                <el-table-column  min-width="120" label="地区"  align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-for="area in scope.row.userAreaList" :key="area.id">{{area.provinceName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="schoolName" min-width="120" label="学校" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{ scope.row.schoolName ? scope.row.schoolName : '--'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="gradeName" min-width="120" label="年级" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.gradeName ? scope.row.gradeName : '--'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="subjectName" min-width="120" label="学科" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.subjectName ? scope.row.subjectName : '--'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="260" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" @click="handlePassword(scope.row)">修改密码</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页组件 -->
        <div class="page">
            <el-pagination
                :hide-on-single-page="false"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :current-page="currentPage"
                :page-sizes="[10, 20, 30]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
        <!-- 编辑组件 -->
        <add-user ref="dial" 
            v-model="dialogVisible"
            :provinceList="provinceList" 
            :isEditOrAdd="isEditOrAdd" 
            @closeDialog="dialogVisible = false"
            @success="getUserList"
        ></add-user>
        <!-- 修改密码组件 -->
        <reset-password v-model="passwordVisible" :id="userId" @closeDialog="passwordVisible = false"></reset-password>
    </div>
</template>
<script>
import request from "@/utils/request.js";
import { deepCopy } from "@/utils/common.js";
import addUser from "./addUser";
import resetPassword from "./resetPassword";
import api from '@/api/api.js'
export default {
    data () {
        return {
            ischoose: true, // 监听是否有选中列表数据
            currentPage: 1, // 分页 当前页数
            total: null, // 分页 总页数
            pageSize: 10, // 分页 每页的默认列表数量
            isLoading: true, //表格数据加载
            input4: "", // 搜索 搜索条件存的值
            rolesList: [
                {value:1, label: '超级管理员'},
                {value:2, label: '区域负责人'},
                {value:3, label: '学校管理员'},
                {value:4, label: '校领导'},
                {value:5, label: '年级主任'},
                {value:6, label: '学科组长'},
                {value:7, label: '班主任'},
                {value:8, label: '任课老师'},
            ],
            provinceList: [],
            schoolList: [],
            roleName: '',
            provinceId: '',
            schoolId: '',
            tableData: [],
            search: '',
            dialogVisible: false, // 是否展示弹出层,
            rowData: {},
            isEditOrAdd: false,
            passwordVisible: false,
            userId: null
        }
    },
    components: {
        addUser,
        resetPassword
    },
    created () {
        this.getUserList();
        this.getProvince();
    },
    methods: {
        // 获取省列表
        async getProvince() {
            let res = await api.getProvinceSelect();
            this.provinceList = res.data;
        },
        // 获取学校列表
        async getSchoolList (val) {
            let params = {
                provinceId: this.provinceId,
                cityId: '',
                districtId: '',
                keyWord: val,
                current: 1,
                size: 20
            }       
            let res = await api.getSchoolList(params);
            this.schoolList = res.data.records;

        },
        provinceChange () {
            this.schoolId = '';
            this.getSchoolList();
            this.currentPage = 1;
            this.getUserList();
        },
        // 获取用户列表
        async getUserList () {
            try {
                let params = {
                    roleName: this.roleName,
                    provinceId: this.provinceId,
                    schoolId: this.schoolId,
                    type: 1,
                    keyWord: this.search,
                    current: this.currentPage,
                    size: this.pageSize
                };
                let res = await api.getUserList(params);
                this.total = res.data.total;
                this.tableData = res.data.records.reduce((arry, cur, index) => {
                    index ++;
                    let obj = []
                    if (cur.userRoleList.length > 0) {
                        obj = cur.userRoleList.map( item => {
                            let a = {index};
                            Object.assign(a, item,cur);
                            return a;
                        })
                    } else {
                        cur.index = index;
                        obj.push(cur)
                    }
                    arry = arry.concat(obj);
                    return arry;
                },[]);
                this.isLoading = false;
            
            } catch (err) {

            }
        },
        searchData () {
            this.currentPage = 1;
            this.getUserList();
        },
        add () {
            this.rowData = {};
            this.isEditOrAdd = false;
            this.dialogVisible = true;
        },
        // 合并单元格
        arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
            const [index, num] = this.commeIndex(row);
            if (columnIndex === 0|| columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4 || columnIndex === 10) {
                if (rowIndex === index) {
                    return {
                        rowspan: num,
                        colspan: 1
                    }
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    }
                }
            }
        },
        commeIndex (row) {
            let index = this.tableData.findIndex(value => {return value.id === row.id});
            let num = this.tableData.reduce((total, cur) => {
                return cur.id === row.id ? total + 1 : total;
            }, 0)
            return [index, num];
        },
        indexMethod (index) {
            return index
        },
        // 分页 每页数据量变化
        handleSizeChange(val) {
            this.pageSize = val;
            this.getUserList();
        },
        // 分页 页码变化
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getUserList();
        },
        // 数据编辑
        handleEdit(index, row) {
            if (row.userRoleList.length === 1 && (row.roleId === 1 || row.roleId === 3)) {
                this.$message({
                    message: '学校管理员、超级管理员不可编辑',
                    type: 'warning'
                });
            } else {
                this.isEditOrAdd = true
                this.dialogVisible = true
               this.$nextTick(()=>{
                    this.$refs.dial.edit(row);
                }) 
            }
        },
        // 修改密码
        handlePassword(row) {
            this.passwordVisible = true;
            this.userId = row.id;

        },
        // 删除用户
        handleDelete(row) {
            this.$confirm('删除用户后数据将不可恢复,是否确认删除用户？', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( async () => {
                const user = row.userRoleList.find((item) => item.teacherId !== 0);
                console.log(user)
                var res = null
                if (user) {
                    const params = {'idList':[user.teacherId]};
                    res = await api.deleteTeacher(params);
                } else {
                    res = await api.deleteUser(row.id);
                }
                if (res.code === 0) {
                    this.$message({
                        type: 'success',
                        message: "删除成功！"
                    });
                    this.getUserList();
                }
            }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     message: '已取消删除'
                // });    
            });
        }
    }
}
</script>