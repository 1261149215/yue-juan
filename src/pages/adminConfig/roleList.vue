<template>
    <div >
        <el-button type="primary" @click="dialogFormVisible = true">新增角色</el-button>
        <div class="roleList">
            <div class="item" v-for="item in roleList" :key="item.id">
                <el-input :ref="'inpt'+ item.id" v-model="item.roleName"  :readonly="editActive !== item.id"></el-input>
                <div style="display:flex;align-items:center;">
                    <div v-if="editActive === item.id">
                        <el-button type="success" size="mini" @click="edit(item)">保存</el-button>
                        <el-button size="mini"  @click="edit_cancel">取消</el-button>
                    </div>
                    <i class="el-icon-edit" @click="editFocus(item)" v-else></i>
                    <i class="el-icon-delete" @click="deleteRole(item)"></i>
                </div>
            </div>
        </div>
        <el-dialog title="新增角色" :visible.sync="dialogFormVisible" @close="cancel" :close-on-click-modal="false" width="520px" class="mydialog">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="120px"
                class="myForm"
            >
                <el-form-item label="角色名称：" prop="roleName">
                    <el-input v-model="ruleForm.roleName" placeholder="请输入角色名称"></el-input>
                </el-form-item>
            </el-form>
             <div slot="footer" class="dialog-footer">
                <div>
                    <el-button type="primary" @click="submit">添 加</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </div>
         </el-dialog>
    </div>
</template>
<script>
import api from '@/api/api'
export default {
    props: ['type'],
    data () {
        return {
            editActive: '',
            roleList: [],
            dialogFormVisible: false,
            ruleForm: {
                roleName: ''
            },
            rules: {
                roleName: [{ required: true, message: "请输入角色名称!", trigger: "blur" }]
            },
        }
    },
    created () {
        this.getRoleList();
    },
    methods: {
        async getRoleList () {
            let res = await api.getRoleList(this.type);
            if (res.code === 0) {
                this.roleList = res.data;
            }
        },
        editFocus (item) {
            this.editActive = item.id;
            this.$refs[`inpt${item.id}`][0].focus();
        },
        async edit (item) {
            let res = await api.saveRole(item);
            if (res.code === 0) {
                this.$message({
                    type: 'success',
                    message: '恭喜，修改成功！'
                })
                this.getRoleList();
                this.editActive = '';
            }
        },
        submit () {
            this.$refs.ruleForm.validate( async (vaild) => {
                if (vaild) {
                    let params = {
                        roleName: this.ruleForm.roleName,
                        sysType: this.type
                    }
                    let res = await api.saveRole(params);
                    if (res.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '恭喜，添加成功！'
                        })
                        this.getRoleList();
                        this.cancel();
                    }
                }
            })
        },
        cancel () {
            this.dialogFormVisible = false;
            this.ruleForm.roleName = "";
            this.$refs['ruleForm'].resetFields();
        },
        edit_cancel () {
            this.editActive = '';
            this.getRoleList();
        },
        deleteRole (item) {
            this.$confirm('确定删除该角色么？', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( async () => {
                let params = {id: item.id};
                let res = await api.deleteRole(params);
                if (res.code === 0) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.getRoleList();
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });    
            });
        }
    }
}
</script>
<style scoped lang="scss">
.roleList {
    border: 1px solid #ebeef5;
    margin-top: 20px;
    .item {
        display: flex;
        align-content: center;
        align-items: center;
        border-bottom: 1px solid #ebeef5;
        padding: 5px 0;
        &:last-child {
            border-bottom: none;
        }
        .el-input {
            width: 200px;
            border: none;
            margin-left: 40px;
            caret-color: #67C23A;
        }
    }
    .el-icon-edit {
        font-size: 18px;
        color: #409eff;
    }
    .el-icon-delete {
        font-size: 18px;
        color: #f51f1f;
        margin-left: 15px;
    }
    
}
.roleList >>> input {
    border: none !important;
}
</style>