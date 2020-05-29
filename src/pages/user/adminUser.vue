<template>
    <div class="container">
        <div class="search">
            <div class="choose">
                <span>系统角色：</span>
                <el-select v-model="roleId" clearable  placeholder="请选择角色"  style="width: 200px;" @change="searchData" >
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"  :value="item.roleId"></el-option>
                </el-select>
                <el-input
                    style="width:200px;margin-left: 40px;"
                    placeholder="请输入姓名/用户名"
                    @change="searchData"
                    v-model="search"
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
                <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                <!-- <el-table-column prop="id" min-width="60" label="编号" align="center"></el-table-column> -->
                <el-table-column prop="realName" min-width="120" label="姓名" align="center"></el-table-column>
                <el-table-column prop="name" min-width="120" label="账号" align="center"></el-table-column>
                <el-table-column prop="userRoleList" min-width="120" label="后台角色" align="center">
                    <template slot-scope="scope">
                        <span v-for="item in scope.row.userRoleList" :key="item.roleId">{{item.roleName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="lastLoginTime" min-width="120" label="最后登录时间" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.lastLoginTime ? scope.row.lastLoginTime : '--'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="260">
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
        <el-dialog :title="isEditOrAdd ? '编辑用户' : '新增用户'" :visible.sync="dialogVisible" @close="cancel" width="600px" class="mydialog" :close-on-click-modal="false">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="120px"
                class="myForm"
            >
                <el-form-item label="姓名" prop="realName"><el-input v-model="ruleForm.realName" placeholder="请输入姓名"></el-input></el-form-item>
                <el-form-item label="用户名" prop="userName"><el-input v-model="ruleForm.userName" placeholder="请输入用户名"></el-input></el-form-item>
                <!-- <el-form-item label="密码" prop="password"><el-input v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input></el-form-item> -->
                <el-form-item label="后台角色" prop="roleId" >
                    <el-radio-group v-model="ruleForm.roleId">
                        <el-radio-button :label="item.roleId" v-for="item in roleList" :key="item.roleId">{{item.roleName}}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <div v-if="!isEditOrAdd">
                    <el-button type="primary" @click="submit" :loading="btn_loading">添 加</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
                <div v-else>
                    <el-button type="primary" @click="submit" :loading="btn_loading">修 改</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </div>
        </el-dialog>
        <!-- 修改密码组件 -->
        <reset-password v-model="passwordVisible" :id="userId" @closeDialog="passwordVisible = false" :title="`修改密码`" :realName="userName"></reset-password>
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
            roleList: [
                {roleId:9, roleName: '运营人员'},
                {roleId:10, roleName: '开发人员'},
                {roleId:11, roleName: '测试人员'}
            ],
            roleId: '',
            tableData: [],
            search: '',
            dialogVisible: false, // 是否展示弹出层,
            isEditOrAdd: false,
            passwordVisible: false,
            userId: null,
            userName: '',
            ruleForm: {
                userId: "",
                realName: null,
                userName: "",
                roleId: ''
            }, 
            rules: {
                roleId: [{ required: true, message: "请选择角色！", trigger: "change" }],
                realName: [{ required: true, message: "请输入姓名！", trigger: "change" }],
                // password: [{ required: true, message: "请输入密码！", trigger: "change" },
                // {
                //     validator: (rule, value, callback) => {
                //         if (value && !value.match(/^[\w]{6,12}$/)) {
                //             callback(new Error(`密码由6-16位数字字母下划线组成`))
                //         } else {
                //             callback()
                //         }
                //         },
                //         trigger: 'blur'
                // }],
                userName: [{ required: true, message: "请输入用户名！", trigger: "change" },{
                    validator: (rule, value, callback) => {
                        if (value && !value.match(/^[\w]{4,12}$/)) {
                            callback(new Error(`用户名由4-12位数字,字母组成`))
                        } else {
                            callback()
                        }
                        },
                        trigger: 'blur'
                }]
            }, // 表单数据校验规则
            btn_loading: false
        }
    },
    components: {
        addUser,
        resetPassword
    },
    created () {
        this.getUserList();
    },
    methods: {
        // 获取用户列表
        async getUserList () {
            try {
                let params = {
                    roleId: this.roleId,
                    type: 0,
                    keyWord: this.search,
                    current: this.currentPage,
                    size: this.pageSize
                };
                let res = await api.getUserList(params);
                this.total = res.data.total;
                this.tableData = res.data.records;
                this.isLoading = false;
            } catch (err) {

            }
        },
        searchData () {
            this.currentPage = 1;
            this.getUserList();
        },
        add () {
            this.isEditOrAdd = false;
            this.dialogVisible = true;
        },
        // 合并单元格
        arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
            const [index, num] = this.commeIndex(row);
            if (columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4) {
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
            console.log(row)
            this.isEditOrAdd = true
            this.dialogVisible = true
            this.ruleForm = {
                userId: row.id,
                realName: row.realName,
                userName: row.name,
                roleId: row.userRoleList[0].roleId
            }

        },
        // 修改密码
        handlePassword(row) {
            this.passwordVisible = true;
            this.userId = row.id;
            this.userName = row.realName;
        },
        // 删除用户
        handleDelete(row) {
            this.$confirm('删除用户后数据将不可恢复,是否确认删除用户？', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( async () => {
               let res = await api.deleteUser(row.id);
               if (res.code === 0) {
                    this.$message({
                        type: 'success',
                        message: "删除成功！"
                    });
                    this.getUserList();
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });    
            });
        },
        // 提交事件
        submit () {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    this.btn_loading = true;
                    let res = await api.addBackUser(this.ruleForm);
                    if (res.code === 0) {
                        let t = this.isEditOrAdd ? '修改': '添加';
                        this.$message({
                            message: `恭喜你，${t}成功`,
                            type: 'success'
                        });
                        this.cancel();
                        if (!this.isEditOrAdd) {
                            this.currentPage = 1;
                        }
                        this.getUserList();
                    }
                    this.btn_loading = false;
                } else {
                    this.btn_loading = false;
                }
            })
        },
        // 取消
        cancel () {
            this.ruleForm = {
                userId: "",
                realName: null,
                userName: "",
                password: '',
                roleId: null
            }
            this.$refs['ruleForm'].resetFields();
            this.dialogVisible = false;
        }
    }
}
</script>
<style scoped lang="scss">
.flex >>> .el-form-item__content {
    display: flex;
}
.el-radio-button >>> .el-radio-button__inner {
    border: 1px solid #409eff !important;
    padding: 7px 20px;
    margin-right: 10px;
    border-radius: 4px !important;
}
.el-input, .el-select{
    width: 300px;
}

</style>
<style>
.mydialog .el-dialog{
    max-height: 800px;
    overflow-y: auto;
}
</style>