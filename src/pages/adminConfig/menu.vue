<template>
    <div style="display:flex">
        <div  class="block">
            <h3>一级模块</h3>
            <div class="menu" v-for="item in list" :key="item.id" :class="{active: levelOneActive === item.id}" @click="getChildren(item, 'levelOneActive', 'levelTwo')">
                <div class="tl">
                    <span>{{item.name}}</span>
                    <label>类型：{{item.type | type}} </label>
                </div>
                <div class="icon_box">
                    <el-popover
                        ref="popover"
                        placement="bottom"
                        trigger="click">
                        <div class="ac_item" @click="add(item, 'children')">添加子集</div>
                        <div class="ac_item" @click="edit(item)">编辑</div>
                        <div class="ac_item" @click="deleteItem(item.id)">删除</div>
                        <i class="el-icon-more" slot="reference"></i>
                    </el-popover>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="menu add" @click="add(0, 'same')">+添加同级</div>
        </div>
        <div  class="block" v-if="levelTwo.length > 0">
            <h3>二级模块</h3>
            <div class="menu" v-for="item in levelTwo" :key="item.id" :class="{active: levelTwoActive === item.id}" @click="getChildren(item, 'levelTwoActive', 'levelThree')">
                <div class="tl">
                    <span>{{item.name}}</span>
                    <label>类型：{{item.type | type}}</label>
                </div>
                <div class="icon_box">
                    <el-popover
                        ref="popover"
                        placement="bottom"
                        trigger="click">
                        <div class="ac_item" @click="add(item, 'children')">添加子集</div>
                        <div class="ac_item" @click="edit(item)">编辑</div>
                        <div class="ac_item" @click="deleteItem(item.id)">删除</div>
                        <i class="el-icon-more" slot="reference"></i>
                    </el-popover>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="menu add" @click="add('levelOneActive', 'same')">+添加同级</div>
        </div>
        <div  class="block" v-if="levelThree.length > 0">
            <h3>三级模块</h3>
            <div class="menu" v-for="item in levelThree" :key="item.id" :class="{active: levelThreeActive === item.id}" @click="getChildren(item, 'levelThreeActive', 'levelFour')">
                <div class="tl">
                    <span>{{item.name}}</span>
                    <label>类型：{{item.type | type}}</label>
                </div>
                <div class="icon_box">
                    <el-popover
                        ref="popover"
                        placement="bottom"
                        trigger="click">
                        <div class="ac_item" @click="add(item, 'children')">添加子集</div>
                        <div class="ac_item" @click="edit(item)">编辑</div>
                        <div class="ac_item" @click="deleteItem(item.id)">删除</div>
                        <i class="el-icon-more" slot="reference"></i>
                    </el-popover>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="menu add" @click="add('levelTwoActive', 'same')">+添加同级</div>
        </div>
        <div  class="block" v-if="levelFour.length > 0">
            <h3>四级模块</h3>
            <div class="menu" v-for="item in levelFour" :key="item.id" :class="{active: levelFourActive === item.id}" @click="getChildren(item, 'levelFourActive', 'levelFive')">
                <div class="tl">
                    <span>{{item.name}}</span>
                    <label>类型：{{item.type | type}}</label>
                </div>
                <div class="icon_box">
                    <el-popover
                        ref="popover"
                        placement="bottom"
                        trigger="click">
                        <div class="ac_item" @click="add(item)">添加子集</div>
                        <div class="ac_item" @click="edit(item)">编辑</div>
                        <div class="ac_item" @click="deleteItem(item.id)">删除</div>
                        <i class="el-icon-more" slot="reference"></i>
                    </el-popover>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="menu add" @click="add('levelThreeActive', 'same')">+添加同级</div>
        </div>
         <div  class="block" v-if="levelFive.length > 0">
            <h3>五级模块</h3>
            <div class="menu" v-for="item in levelFive" :key="item.id" :class="{active: levelFiveActive === item.id}" @click="getChildren(item, 'levelFiveActive', 'levelSix')">
                <div class="tl">
                    <span>{{item.name}}</span>
                    <label>类型：{{item.type | type}}</label>
                </div>
                <div class="icon_box">
                    <el-popover
                        ref="popover"
                        placement="bottom"
                        trigger="click">
                        <div class="ac_item" @click="add(item)">添加子集</div>
                        <div class="ac_item" @click="edit(item)">编辑</div>
                        <div class="ac_item" @click="deleteItem(item.id)">删除</div>
                        <i class="el-icon-more" slot="reference"></i>
                    </el-popover>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="menu add" @click="add('levelFourActive', 'same')">+添加同级</div>
        </div>
        <div  class="block" v-if="levelSix.length > 0">
            <h3>六级模块</h3>
            <div class="menu" v-for="item in levelSix" :key="item.id" :class="{active: levelSixActive === item.id}" @click="getChildren(item, 'levelSixActive', 'levelSeven')">
                <div class="tl">
                    <span>{{item.name}}</span>
                    <label>类型：{{item.type | type}}</label>
                </div>
                <div class="icon_box">
                    <el-popover
                        ref="popover"
                        placement="bottom"
                        trigger="click">
                        <div class="ac_item" @click="add(item)">添加子集</div>
                        <div class="ac_item" @click="edit(item)">编辑</div>
                        <div class="ac_item" @click="deleteItem(item.id)">删除</div>
                        <i class="el-icon-more" slot="reference"></i>
                    </el-popover>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="menu add" @click="add('levelFiveActive', 'same')">+添加同级</div>
        </div>
        <div  class="block" v-if="levelSeven.length > 0">
            <h3>七级模块</h3>
            <div class="menu" v-for="item in levelSeven" :key="item.id" :class="{active: levelSevenActive === item.id}" @click="getChildren(item, 'levelSevenActive', 'levelEight')">
                <div class="tl">
                    <span>{{item.name}}</span>
                    <label>类型：{{item.type | type}}</label>
                </div>
                <div class="icon_box">
                    <el-popover
                        ref="popover"
                        placement="bottom"
                        trigger="click">
                        <div class="ac_item" @click="add(item)">添加子集</div>
                        <div class="ac_item" @click="edit(item)">编辑</div>
                        <div class="ac_item" @click="deleteItem(item.id)">删除</div>
                        <i class="el-icon-more" slot="reference"></i>
                    </el-popover>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="menu add" @click="add('levelSixActive', 'same')">+添加同级</div>
        </div>
        <div  class="block" v-if="levelEight.length > 0">
            <h3>八级模块</h3>
            <div class="menu" v-for="item in levelEight" :key="item.id" :class="{active: levelEightActive === item.id}" @click="getChildren(item, 'levelEightActive', 'levelNight')">
                <div class="tl">
                    <span>{{item.name}}</span>
                    <label>类型：{{item.type | type}}</label>
                </div>
                <div class="icon_box">
                    <el-popover
                        ref="popover"
                        placement="bottom"
                        trigger="click">
                        <div class="ac_item" @click="edit(item)">编辑</div>
                        <div class="ac_item" @click="deleteItem(item.id)">删除</div>
                        <i class="el-icon-more" slot="reference"></i>
                    </el-popover>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="menu add" @click="add('levelSevenActive', 'same')">+添加同级</div>
        </div>
        <el-dialog :title="isEditOrAdd ? '编辑权限类目' : '新增权限类目'" :visible.sync="dialogFormVisible" @close="cancel" :close-on-click-modal="false" width="520px" class="mydialog">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="120px"
                class="myForm"
            >
                <el-form-item label="上级类目：" size="small">
                    <el-input v-model="ruleForm.parentName"  readonly disabled></el-input>
                </el-form-item>
                <el-form-item label="类目名称：" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入类目名称" maxlength="20" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="类目授权码：" prop="perms">
                    <el-input v-model="ruleForm.perms" placeholder="请输入类目授权码" maxlength="20" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="类目类型：">
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio :label="0">目录</el-radio>
                        <el-radio :label="1">菜单</el-radio>
                        <el-radio :label="2">按钮</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <div v-if="!isEditOrAdd">
                    <el-button type="primary" @click="submit" :loading="btn_loading">添 加</el-button>
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
import api from '@/api/api'
export default {
    props: ['type'],
    data () {
        return {
            levelOneActive: '',
            levelTwoActive: '',
            levelThreeActive: '',
            levelFourActive: '',
            levelFiveActive: '',
            levelSixActive: '',
            levelSevenActive: '',
            levelEightActive: '',
            levelNightActive: '',
            levelTenActive: '',
            levelOneActiveName: '',
            levelTwoActiveName: '',
            levelThreeActiveName: '',
            levelFourActiveName: '',
            levelFiveActiveName: '',
            levelSixActiveName: '',
            levelSevenActiveName: '',
            levelEightActiveName: '',
            levelNightActiveName: '',
            levelTenActiveName: '',
            levelTwo: [],
            levelThree: [],
            levelFour: [],
            levelFive: [],
            levelSix: [],
            levelSeven: [],
            levelEight: [],
            levelNight: [],
            levelTen: [],
            ruleForm: {
                id: '',
                parentName: '',
                parentId: '',
                orderNum: '',
                name: '',
                perms: '',
                sysType: this.type,
                type: 1
            },
            rules: {
                name: [{ required: true, message: "请输入类目名称！", trigger: "blur" }],
                perms: [{ required: true, message: "请输入类目授权码！", trigger: "blur" }]
            },
            isEditOrAdd: false,
            dialogFormVisible: false,
            list: [],
            btn_loading: false
        }
    },
    created () {
        this.getList();
    },
    filters: {
        type (val) {
            switch (val) {
                case 0 : 
                    return '目录';
                    break;
                case 1:
                    return '菜单';
                    break;
                case 2: 
                    return '按钮';
                    break;
                default: return '目录';
            }
        }
    },
    methods: {
        async getList () {
            let res = await api.findMenuTree(this.type);
            if (res.code === 0) {
                this.list = res.data;
            }
        },
        getChildren (item, activename, level) {
            this[activename] = item.id;
            this[`${activename}Name`] = item.name;
            this[level] = item.children; 
            this[`${level}Active`] = '';
            this.renew();
        },
        deleteItem (id) {
            this.$confirm('确认删除么？', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( async () => {
                let params = {id};
                let res = await api.deleteMenu(params);
                if (res.code === 0) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    await this.getList();
                    this.renew();
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });    
            });
        },
        add (item, level) {
            this.isEditOrAdd = false;
            this.dialogFormVisible = true;
            if (level === 'same') {             // 新增同级
                if (item === 0) {
                    this.ruleForm.parentId = 0;
                } else {
                    this.ruleForm.parentId = this[item];
                }
                this.ruleForm.parentName = this[`${item}Name`];
            } else {                            // 新增子集
                this.ruleForm.parentId = item.id;
                this.ruleForm.parentName = item.name;
            }
        },
        edit (item) {
            this.isEditOrAdd = true;
            this.dialogFormVisible = true;
            this.ruleForm = {
                id: item.id,
                parentName: item.parentName,
                parentId: item.parentId,
                orderNum: item.orderNum,
                name: item.name,
                perms: item.perms,
                sysType: this.type,
                type: item.type
            }
        },
        submit () {
            this.$refs.ruleForm.validate( async (vaild) => {
                if (vaild) {
                    this.btn_loading = true;
                    var res = '';
                    if (this.isEditOrAdd) {
                        res = await api.editMenu(this.ruleForm);
                    } else {
                        res = await api.addMenu(this.ruleForm);
                    }
                    let text = this.isEditOrAdd ? '编辑' : '添加';
                    if (res.code === 0) {
                        this.$message({
                            message: `恭喜, ${text}成功`,
                            type: 'success'
                        })
                        await this.getList();
                        this.renew();
                        this.cancel();
                    }
                    this.btn_loading = false;
                } else {
                    this.btn_loading = false;
                }
            })
        },
        cancel () {
            this.dialogFormVisible = false;
            this.ruleForm ={
                id: '',
                parentName: '',
                parentId: '',
                orderNum: '',
                name: '',
                perms: '',
                sysType: this.type,
                type: 0
            };
            this.$refs['ruleForm'].resetFields();
        },
        // 更新数据
        async renew () {
            let a = this.list.find(item => item.id === this.levelOneActive);
            this.levelTwo = a ? a.children : [];
            let b = this.levelTwo.find(item => item.id === this.levelTwoActive);
            this.levelThree = b ? b.children : [];
            let c = this.levelThree.find(item => item.id === this.levelThreeActive);
            this.levelFour = c ? c.children : [];
            let d = this.levelFour.find(item => item.id === this.levelFourActive);
            this.levelFive = d ? d.children : [];
            let e = this.levelFive.find(item => item.id === this.levelFiveActive);
            this.levelSix = e ? e.children : [];
            let f = this.levelSix.find(item => item.id === this.levelSixActive);
            this.levelSeven = f ? f.children : [];
            let g = this.levelSeven.find(item => item.id === this.levelSevenActive);
            this.levelEight = g ? g.children : [];
        }
    }
}
</script>
<style scoped lang="scss">
.block {
    min-width: 300px;
    display: flex;
    // justify-content: center;
    border-right: 1px solid #ebeef5;
    flex-flow: column;
    padding: 0 20px;
    box-sizing: border-box;
    .menu {
        border: 1px solid #ebeef5;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        // box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        min-height: 66px;
        box-sizing: border-box;
        margin-bottom: 15px;
    }
    .active, .menu:hover {
        background: #409eff;
        color: #fff;
        box-shadow: 0 2px 12px 0 #c0c4cc;
        border: none;
        .tl label {
            color: #fff;
        }
        .icon_box .el-icon-more {
            color: #fff;
        }
    }
    .tl {
        display: flex;
        flex-flow: column;
        padding-left: 10px;
        span {
            margin-bottom: 10px;
        }
        label {
            font-size: 14px;
            color: #999;
        }
    }
    .icon_box {
        display: flex;
        align-items: center;
        .el-icon-more {
            font-size: 22px;
            transform: rotate(90deg);
            color: #ccc;
            &:hover{
                color: #fff;
            }
        }
        .el-icon-arrow-right {
            font-size: 18px;
            color: #dcdfe6;
        }
    }
    .add {
        align-items: center;
        justify-content: center;
        background: #fbfbfb;
    }

}
.ac_item {
    border-bottom: 1px solid #EBEEF5;
    text-align: center;
    padding: 10px;
    &:hover {
        color: #409eff;
    }
}
.el-input {
    width: 80%;
}

</style>
<style>
.el-popover {
    padding: 0;
}
</style>