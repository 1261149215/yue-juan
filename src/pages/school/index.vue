<template>
    <div class="container">
        <div class="search">
            <div class="choose">
                <span>地区：</span>
                <el-cascader v-model="schoolArea" :options="areatree" @change="getSchoolList" clearable style="width:300px" placeholder="请选择地区"></el-cascader>
                <el-input
                    style="width:300px;margin-left: 40px;"
                    placeholder="请输入校名称/校管理员账号/管理员电话"
                    @change="searchData"
                    v-model="keyWord"
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
                tooltip-effect="dark"
                style="width: 100%;"
            >
                <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
                <!-- <el-table-column prop="id" min-width="60" label="编号" align="center"></el-table-column> -->
                <el-table-column prop="schoolName" min-width="120" label="学校名称" align="center"></el-table-column>
                <el-table-column prop="name" min-width="120" label="地区" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.provinceName}}，{{scope.row.cityName}}，{{scope.row.districtName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="managerAccount" min-width="120" label="校管理员账号" align="center"> </el-table-column>
                <el-table-column prop="managerName" min-width="120" label="管理员姓名" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.managerName ? scope.row.managerName : '--'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="managerPhone" min-width="120" label="管理员电话" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.managerPhone ? scope.row.managerPhone : '--'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="260" align="center" fixed="right">
                    <template slot-scope="scope" >
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        <el-dialog :title="isEditOrAdd ? '编辑学校' : '新增学校'" :visible.sync="dialogVisible" @close="cancel" width="660px" class="mydialog" :close-on-click-modal="false">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="150px"
                class="myForm"
            >
                <h3>学校基本信息</h3>
                <el-form-item label="学校名称" prop="schoolName"><el-input v-model="ruleForm.schoolName" placeholder="请输入学校名称"></el-input></el-form-item>
                <el-form-item label="学校所属地区" prop="schoolArea">
                    <el-cascader v-model="ruleForm.schoolArea" :options="areatree" ></el-cascader>
                </el-form-item>
                <el-form-item label="学校详细地址" prop="schoolAddress"><el-input type="textarea" style="width:400px" autosize v-model="ruleForm.schoolAddress" placeholder="请输入学校详细地址"></el-input></el-form-item>
                <!-- <el-form-item label="密码" prop="password"><el-input v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input></el-form-item> -->
                <el-form-item label="学校备注" prop="remark" >
                    <el-input  type="textarea" placeholder="请输入学校备注" style="width:400px" autosize v-model="ruleForm.remark"> </el-input>
                </el-form-item>
                <h3>管理员基本信息</h3>
                <el-form-item label="学校管理员姓名" prop="managerName"><el-input v-model="ruleForm.managerName" placeholder="请输入校管理员姓名" autocomplete="off"></el-input></el-form-item>
                <el-form-item label="学校管理员电话号码" prop="managerPhone"><el-input v-model="ruleForm.managerPhone" placeholder="请输入电话号码" ></el-input></el-form-item>
                <el-form-item label="学校管理员密码" prop="managerPassword"><el-input type="password" autocomplete="off" :readonly="read" @focus="read = false" v-model="ruleForm.managerPassword" placeholder="默认为账号后六位"></el-input></el-form-item>
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
    </div>
</template>
<script>
import request from "@/utils/request.js";
import { deepCopy } from "@/utils/common.js";
// import addUser from "./addUser";

import api from '@/api/api.js'
export default {
    data () {
        return {
            ischoose: true, // 监听是否有选中列表数据
            currentPage: 1, // 分页 当前页数
            total: null, // 分页 总页数
            pageSize: 10, // 分页 每页的默认列表数量
            isLoading: true, //表格数据加载
            areatree: null,
            schoolArea: [],
            tableData: [],
            keyWord: '',
            read: true,
            dialogVisible: false, // 是否展示弹出层,
            isEditOrAdd: false,
            ruleForm: {
                id: 0,
                schoolName: "",
                schoolArea: [],
                schoolAddress: '',
                managerName: "",
                managerPhone: '',
                managerPassword: '',
                remark: ''
            }, 
            rules: {
                schoolName: [{ required: true, message: "请输入学校名称！", trigger: "blur" }],
                schoolArea: [{ required: true, message: "请选择学校地区！", trigger: "blur" }],
                managerName: [{ required: true, message: "请输入管理员姓名！", trigger: "blur" }],
                managerPhone: [{ required: true, message: "请输入管理员手机号！", trigger: "blur" },
                {
                        validator: (rule, value, callback) => {
                        if (value && !value.match(/^1\d{10}$/)) {
                            callback(new Error(`请输入正确手机号码`))
                        } else {
                            callback()
                        }
                        },
                        trigger: 'blur'
                    }
                ]
            }, // 表单数据校验规则
            btn_loading: false
        }
    },
    created () {
        this.getArea();
        this.getSchoolList();
    },
    methods: {
         // 获取省市区三级树
        async getArea () {
            let res = await api.getAreaTree();
            this.areatree = res.data
        },
        // 获取学校列表
        async getSchoolList () {
            const area = this.schoolArea;
            let params = {
                provinceId: area[0],
                cityId: area[1],
                districtId: area[2],
                keyWord: this.keyWord,
                current: this.currentPage,
                size: this.pageSize
            }       
            let res = await api.getSchoolList2(params);
            this.tableData = res.data.records;
            this.isLoading = false;
            this.total = res.data.total;
        },
        searchData () {
            this.currentPage = 1;
            this.getSchoolList();
        },
        add () {
            this.isEditOrAdd = false;
            this.dialogVisible = true;
        },
        // 分页 每页数据量变化
        handleSizeChange(val) {
            this.pageSize = val;
            this.getSchoolList();
        },
        // 分页 页码变化
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getSchoolList();
        },
        // 数据编辑
        handleEdit(index, row) {
            this.isEditOrAdd = true;
            this.dialogVisible = true;
            this.ruleForm = {...row};
            this.ruleForm.schoolArea = [row.provinceId, row.cityId, row.districtId];
            this.ruleForm.managerPassword = '++++++';
            console.log(this.ruleForm)
        },
        // 删除用户
        handleDelete(row) {
            this.$confirm('删除学校后数据将不可恢复,是否确认删除学校?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( async () => {
            //    let res = await api.deleteUser(row.id);
            //    if (res.code === 0) {
            //         this.$message({
            //             type: 'success',
            //             message: "删除成功！"
            //         });
            //         this.getSchoolList();
            //     }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });    
            });
        },
        // 新增学校提交事件
        submit () {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    this.btn_loading = true;
                    let params = {...this.ruleForm};
                    params.provinceId = this.ruleForm.schoolArea[0];
                    params.cityId = this.ruleForm.schoolArea[1];
                    params.districtId = this.ruleForm.schoolArea[2];
                    let res = await api.addSchool(params);
                    if (res.code === 0) {
                        let text = this.isEditOrAdd ? '修改' : '添加'
                        this.$message({
                            message: `恭喜你，${text}成功`,
                            type: 'success'
                        });
                        this.cancel();
                        if (!this.isEditOrAdd) {
                            this.currentPage = 1;
                        }
                        this.getSchoolList();
                    }
                    this.btn_loading = false
                } else {
                    this.btn_loading = false
                }
            })
        },
        // 取消
        cancel () {
            this.ruleForm = {
                id: 0,
                schoolName: "",
                schoolArea: [],
                schoolAddress: '',
                managerName: "",
                managerPhone: '',
                managerPassword: '',
                remark: ''
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
    border: 1px solid #409eff;
    padding: 7px 20px;
    margin-right: 10px;
    border-radius: 4px;
}
.el-input, .el-select{
    width: 400px;
}
.myForm {
    h3 {
        text-align: center;
        color: #67c23a;
        padding-bottom: 10px;
    }
}
</style>
<style>
.mydialog .el-dialog{
    max-height: 800px;
    overflow-y: auto;
}
.el-table th {
    background: #f8f8f8;
    color: #333;
}
</style>