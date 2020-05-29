<template>
    <div>
        <el-dialog :title="isEditOrAdd ? '编辑用户' : '新增用户'" :visible.sync="dialogFormVisible" @close="cancel" :close-on-click-modal="false" width="720px" class="mydialog">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="120px"
                class="myForm"
            >
                <el-form-item label="类型" size="small" prop="type">
                    <el-radio-group v-model="type" :disabled="isEditOrAdd">
                        <el-radio-button label="1">校外</el-radio-button>
                        <el-radio-button label="2">校内</el-radio-button>
                    </el-radio-group>
                </el-form-item>
    
                <el-form-item label="负责地区" prop="province" v-if="type == 1">
                    <el-select v-model="ruleForm.province" multiple placeholder="请选择地区" >
                        <el-option v-for="item in provinceList" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学校所属地区" prop="schoolArea" v-if="type == 2">
                    <el-cascader v-model="ruleForm.schoolArea" :options="areatree" @change="schoolAreaChange" placeholder="请选择学校所属地区" style="width:300px"></el-cascader>
                </el-form-item>

                <el-form-item label="学校" prop="schoolId" v-if="type == 2">
                    <el-select v-model="ruleForm.schoolId" placeholder="请选择学校" @change="schoolChange">
                        <el-option v-for="item in schoolList"  :key="item.id" :label="item.schoolName"  :value="item.id" ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="姓名" prop="realName"><el-input v-model="ruleForm.realName" placeholder="请输入姓名" maxlength="20" show-word-limit></el-input></el-form-item>
                <el-form-item label="手机号" prop="mobile"><el-input v-model="ruleForm.mobile" placeholder="请输入联系电话"></el-input></el-form-item>
                <el-form-item label="系统角色" prop="roleName" v-if="type == 1">
                        <el-radio-group v-model="ruleForm.roleName" >
                            <el-radio-button label="区域负责人"></el-radio-button>
                        </el-radio-group>
                </el-form-item>
                <div v-if="type == 2">
                <div  v-for="(role, index) in ruleForm.roleList" :key="role.roleId" >
                    <el-form-item label="系统角色" :prop="`roleList[${index}].roleName`" :rules="rules.roleName">
                        <el-radio-group v-model="role.roleName" >
                            <el-radio-button label="任课老师">任课老师</el-radio-button>
                            <el-radio-button label="班主任">班主任</el-radio-button>
                            <el-radio-button label="学科组长">学科组长</el-radio-button>
                            <el-radio-button label="年级主任">年级主任</el-radio-button>
                            <el-radio-button label="校领导">校领导</el-radio-button>
                            <!-- <el-radio-button label="学校管理员">学校管理员</el-radio-button> -->
                        </el-radio-group>
                        <i class="el-icon-circle-plus-outline" style="color:#67c23a" v-if="type == 2 && index === 0" @click="addRole"></i>
                        <i class="el-icon-delete" style="color: #f51f1f;" v-if="type ==2 && index !== 0" @click="deleteRole(index)"></i>
                    </el-form-item>
                    <el-form-item label="年级" :prop="`roleList[${index}].gradeId`" :rules="rules.gradeId" v-if="role.roleName != '校领导' && role.roleName != '学校管理员'">
                        <el-select v-model="role.gradeId" placeholder="请选择年级" @change="gradeChange(index)">
                            <el-option v-for="item in gradeList" :key="item.id" :label="item.gradeName"  :value="item.id" ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="学科" :prop="`roleList[${index}].subjectId`" :rules="rules.subjectId" v-if="role.roleName == '任课老师' || role.roleName == '学科组长'">
                        <el-select v-model="role.subjectId" placeholder="请选择学科" clearable @change="getSubjectClasslist(index)">
                            <el-option v-for="item in subjectList" :key="item.id" :label="item.subjectName" :value="item.id" ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="行政班" :prop="`roleList[${index}].xzClass`" :rules="rules.xzClass" class="flex" v-if="role.roleName == '任课老师' || role.roleName == '班主任'">
                        <div v-if="role.xzClassList.length > 0">
                            <el-checkbox  v-model="role.checkAll_xzClassList" @change="(val) => handleCheckAllChange(val, 'xzClass', index)" style="margin-right:20px">全选</el-checkbox>
                            <el-checkbox-group v-model="role.xzClass" @change="(val) => handleClassChange(val,'xzClassList', index)">
                                <el-checkbox v-for="item in role.xzClassList" :label="item.id" :key="item.id" >{{item.className}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div v-else style="color: #909399;">暂无行政班</div>
                    </el-form-item>
                    <el-form-item label="教学班" :prop="`roleList[${index}].jxClass`" :rules="rules.jxClass" class="flex" v-if="role.roleName == '任课老师'">
                        <div v-if="role.jxClassList.length > 0">
                            <el-checkbox  v-model="role.checkAll_jxClassList" @change="(val) => handleCheckAllChange(val, 'jxClass', index)" style="margin-right:20px">全选</el-checkbox>
                            <el-checkbox-group v-model="role.jxClass" @change="(val) => handleClassChange(val,'jxClassList', index)">
                                <el-checkbox v-for="item in role.jxClassList" :label="item.id" :key="item.id">{{item.className}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div v-else style="color: #909399;">暂无教学班</div>
                    </el-form-item>
                </div></div>
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
import api from '@/api/api.js'
export default {
    name: 'addUser',
    props: {
        value: Boolean,
        provinceList: Array,
        isEditOrAdd: Boolean
    },
    data () {
        return {
            multipleSelection: [], // 列表选中的 lists
            isIndeterminate: false,
            type: 1,
            ruleForm: {
                id: "",
                realName: null,
                province: [],
                schoolArea: [],
                schoolId: "",
                mobile: "",
                roleName: "",
                roleList: [{
                    xzClass: [],
                    jxClass: [],
                    xzClassList: [],
                    jxClassList: [],
                    gradeId: "",
                    subjectId: "",
                    roleName: '',
                    checkAll_jxClassList: false,
                    checkAll_xzClassList: false
                }]
            }, // 表单数据存储变量

            rules: {
                province: [{ required: true, message: "请选择地区！", trigger: "change" }],
                schoolArea: [{ required: true, message: "请选择学校所属地区！", trigger: "change" }],
                roleName: [{ required: true, message: "请选择角色！", trigger: "change" }],
                realName: [{ required: true, message: "请输入姓名！", trigger: "change" }],
                subjectId: [{ required: true, message: "请选择科目！", trigger: "change" }],
                gradeId: [{ required: true, message: "请选择年级！", trigger: "change" }],
                mobile: [
                    { required: true, message: "请输入手机号！", trigger: "change" },
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
                ],
                schoolId: [{ required: true, message: "请选择学校！", trigger: "change" }]
            }, // 表单数据校验规则
            schoolList: [],
            gradeList: [],
            subjectList: [],
            areatree: [],
            btn_loading: false
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
        }
    },
    created () {
        this.getArea();
    },
    methods: {
        handleCheckAllChange (value, checkbox, index) {
            const arry = this.ruleForm.roleList[index][`${checkbox}List`].map(item => item.id);
            this.ruleForm.roleList[index][checkbox] = value ? arry : [];
        },
        handleClassChange (value, list, index) {
            let count = this.ruleForm.roleList[index][list].reduce((total, cur) => {
                return value.includes(cur.id) ? total + 1: total + 0
            },0);
            this.ruleForm.roleList[index][`checkAll_${list}`] = count === this.ruleForm.roleList[index][list].length;
            this.classChange(index)
        },
        classChange (index) {
            let arry = this.ruleForm.roleList[index].xzClass.concat(this.ruleForm.roleList[index].jxClass)
            this.ruleForm.roleList[index].classList = [];
            arry.map( item => {
                let obj = {
                    classId: item,
                    className: '',
                    subjectId: null
                }
                this.ruleForm.roleList[index].classList.push(obj);
            })
        },
        edit (row) {
            Object.assign(this.ruleForm,row)
            //this.ruleForm = {...this.userData};
            console.log(this.ruleForm)
            this.type = row.roleName === '区域负责人' ? 1: 2;
            switch (this.type) {
                case 1: 
                    this.getUser(row.id);
                    break;
                case 2:
                    let userAreaList = row.userAreaList;
                    this.ruleForm.schoolArea = [userAreaList[0].provinceId, userAreaList[0].cityId, userAreaList[0].districtId];
                    this.getSchoolList();
                    this.getGrade();
                    this.getSubject();
                    this.getTeacher()
                    break;
            }
          
        },
        // 获取校外用户
        async getUser (userId) {
            let res = await api.getUserById(userId);
            this.ruleForm.province = res.data.userAreaList.map(item => item.provinceId);
        },
        // 获取教师详情
        async getTeacher () {
            let item = this.ruleForm.userRoleList.find((item) => item.teacherId !== 0)
            let res = await api.getTeacherById(item.teacherId);
            if (res.data) {
                this.ruleForm.roleList = res.data.roleList.reduce((arry, cur, index) => {
                    let classVal = cur.classList.map(item => {
                        return item.classId
                    })
                    cur.gradeId = cur.gradeId === 0 ? '' : cur.gradeId;
                    cur.subjectId = cur.subjectId === 0 ? '' : cur.subjectId;
                    let arr2 = {xzClass: classVal, jxClass: classVal, checkAll_xzClassList: false, checkAll_jxClassList: false, xzClassList: [], jxClassList: []}
                    let newcur = Object.assign(cur, arr2);
                    arry.push(newcur)
                    return arry
                },[]);
                this.ruleForm.roleList.reduce((arry, cur, index) => {
                    this.getClassList(index);
                    if (cur.subjectId) {
                        this.getSubjectClasslist(index);
                    }
                },0)
            }
        },
        // 获取省市区三级树
        async getArea () {
            let res = await api.getAreaTree();
            this.areatree = res.data
        },
        // 获取学校列表
        async getSchoolList () {
            const area = this.ruleForm.schoolArea;
            let params = {
                provinceId: area[0],
                cityId: area[1],
                districtId: area[2],
                keyWord: "",
                current: 1,
                size: 1000
            }       
            let res = await api.getSchoolList(params);
            this.schoolList = res.data.records;
        },
        schoolAreaChange (val) {
            this.ruleForm.schoolId = '';
            this.getSchoolList();
        },
        schoolChange () {
            this.ruleForm.gradeId = '';
            this.getGrade();
            this.getSubject();
        },
        // 获取年级
        async getGrade () {
            let res = await api.getGradeList(this.ruleForm.schoolId);
            this.gradeList = res.data;
        },
        gradeChange (index) {
            this.getClassList(index);
            this.getSubjectClasslist(index);
        },
        // 获取学科列表
        async getSubject () {
            let res = await api.getSubjectList(this.ruleForm.schoolId);
            this.subjectList = res.data;
        },
        // 获取行政班列表 
        async getClassList (index) {
            let {schoolId} = this.ruleForm;
            let res = await api.getClasslist(schoolId, this.ruleForm.roleList[index].gradeId);
            this.ruleForm.roleList[index].xzClassList = res.data;
            let b = this.ruleForm.roleList[index].xzClass;
            this.ruleForm.roleList[index].xzClass = res.data.reduce((arr, cur, inde) => {
                b.indexOf(cur.id) > -1 ? arr.push(cur.id) : arr
                return arr
            }, []);
        },
        // 获取教学班列表 
        async getSubjectClasslist (index) {
            let {schoolId} = this.ruleForm;
            let res = await api.getSubjectClasslist(schoolId, this.ruleForm.roleList[index].gradeId, this.ruleForm.roleList[index].subjectId);
            this.ruleForm.roleList[index].jxClassList = res.data;
            this.ruleForm.roleList[index].jxClass = res.data.reduce((arr, cur, inde) => {
                this.ruleForm.roleList[index].jxClass.indexOf(cur.id) > -1 ? arr.push(cur.id) : arr
                return arr
            }, []);
        },
        // 提交事件
        submit () {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    this.btn_loading = true;
                    if (this.type == 1) {
                        this.addSchoolOutUser();
                    } else {
                        this.addTeacher();
                    }
                } else {
                    this.btn_loading = false;
                }
            })
        },
        // 新增校外角色
        async addSchoolOutUser () {
            const areaList = this.ruleForm.province.map( item => {
                return {"provinceId": item}
            })
            let params = { 
                id: this.isEditOrAdd ? this.ruleForm.id : 0, 
                realName: this.ruleForm.realName,
                email: '',
                mobile: this.ruleForm.mobile,
                roleName: '区域负责人',
                areaList: areaList
            }
            let res = await api.addSchoolOutUser(params);
            if(res.code === 0) {
                let text = this.isEditOrAdd ? '修改' : '添加'
                this.$message({
                    message: `恭喜你，${text}成功`,
                    type: 'success'
                });
                this.success();
            }
            this.btn_loading = false;
        },
        // 新增校内角色
        async addTeacher () {
            let data = this.ruleForm;
            let params = {
                id: this.isEditOrAdd ? data.teacherId : 0,
                schoolId: data.schoolId,
                teacherName: data.realName,
                teacherPhone: data.mobile,
                teacherEmail: '',
                isSchoolManager: '',
                roleList: data.roleList
            }
            let res = await api.addTeacher(params);
            if(res.code === 0) {
                let text = this.isEditOrAdd ? '修改' : '添加'
                this.$message({
                    message: `恭喜你，${text}成功`,
                    type: 'success'
                });
                this.success();
            }
            this.btn_loading = false;
        },
        // 新增角色列表
        addRole () {
            let obj = {
                xzClass: [],
                jxClass: [],
                xzClassList: [],
                jxClassList: [],
                gradeId: "",
                subjectId: "",
                roleName: '',
                checkAll_jxClassList: false,
                checkAll_xzClassList: false
            }
            this.ruleForm.roleList.push(obj);
        },
        // 删除角色
        deleteRole (index) {
            this.ruleForm.roleList.splice(index,1);
        },
        // 取消
        cancel () {
            this.type = 1
            this.schoolList = []
            this.ruleForm = {
                id: "",
                realName: null,
                province: [],
                schoolArea: [],
                schoolId: null,
                mobile: "",
                roleList:[{
                    xzClass: [],
                    jxClass: [],
                    xzClassList: [],
                    jxClassList: [],
                    gradeId: "",
                    subjectId: "",
                    roleName: '',
                    checkAll_jxClassList: false,
                    checkAll_xzClassList: false
                }]
            }
            this.$refs['ruleForm'].resetFields();
            this.$emit('closeDialog', true);
        },
        success () {
            this.dialogFormVisible = false;
            this.$emit('success', true);
            this.$refs.ruleForm.resetFields();
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
    padding: 5px 10px;
    margin-right: 10px;
    border-radius: 4px !important;
    min-width: 64px;
}
.el-input, .el-select{
    width: 300px;
}
.el-radio-button.is-disabled >>> .el-radio-button__inner {
    border-color: #EBEEF5;
}
</style>
<style>
.mydialog .el-dialog{
    max-height: 800px;
    overflow-y: auto;
}
</style>