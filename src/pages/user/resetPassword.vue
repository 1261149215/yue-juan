<template>
    <div>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="cancel" width="500px">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="120px"
                class="myForm"
            >
                <el-form-item label="姓名" v-if="realName"><el-input v-model="realName" disabled></el-input></el-form-item>
                <el-form-item label="新密码" prop="newPassword"><el-input v-model="ruleForm.newPassword" placeholder="请输入密码"  autocomplete='off' :readonly="newread" @focus="newread = false" show-password></el-input></el-form-item>
                <el-form-item label="再次输入密码" prop="confirmPassword"><el-input v-model="ruleForm.confirmPassword" placeholder="请再次输入密码" show-password autocomplete='off' :readonly="confirmread" @focus="confirmread = false"></el-input></el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <div>
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="submit">修 改</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import api from '@/api/api.js'
import { mapGetters } from 'vuex'
import {removeToken} from '@/utils/common';
export default {
    props: {
        value: Boolean,
        id: Number,
        title: String,
        realName: String,
        exit: Boolean
    },
    data () {
        var validatePass2 = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            newread: true,
            confirmread: true,
            ruleForm: {
                newPassword: null,
                confirmPassword: null
            },
            rules: {
                newPassword: [{ required: true, message: "请输入密码", trigger: "blur" },
                {
                    validator: (rule, value, callback) => {
                        if (value && !value.match(/^[\w]{6,12}$/)) {
                            callback(new Error(`密码由6-12位数字字母下划线组成`))
                        } else {
                            callback()
                        }
                        },
                        trigger: 'blur'
                }
                ],
                confirmPassword: [{  required: true, validator: validatePass2, trigger: "blur" }]
            }
        }
    },
    computed: {
        dialogFormVisible: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        },
        ...mapGetters([
            'token',
            'user'
        ])
    },
    methods: {
        submit () {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {  
                    let params = {
                        id: this.id,
                        newPassword: this.$md5(this.ruleForm.newPassword)
                    }
                    let res = await api.resetUserPassword(params)
                    if(res.code === 0) {
                        let text = this.exit ? ',请重新登录' : ''
                        this.$message({
                            message: `恭喜，修改成功${text}`,
                            type: 'success'
                        });
                        this.cancel();
                        if (this.exit) {
                            this.$store.commit('SET_TOKEN_ig', '');
                            this.$store.commit('SET_USER', null);
                            removeToken()
                            this.$router.replace({path: '/login', query: {redirct: this.$route.path}});
                        }
                    }
                }
            })
        },
        cancel () {
            this.$refs['ruleForm'].resetFields();
            this.$emit('closeDialog', true);
        }
    }
}
</script>
<style scoped lang="scss">
.el-input, .el-select{
    width: 300px;
}
.mytitle {
    text-align: center;
    color: #67c23a;
    padding-bottom: 10px;
}
</style>