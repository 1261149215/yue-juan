<template>
    <div class="contain_box">
        <div class="left">
            <ul>
                <li :class="{on: roleActive === item.id}" @click="getRoleMenu(item.id)" v-for="item in roleList" :key="item.id">{{item.roleName}}</li>
            </ul>
        </div>
        <div class="right">
            <div class="action"><el-button type="success" @click="save">保存</el-button></div>
            <el-tree
            :data="menuTree"
            show-checkbox
            default-expand-all
            :check-on-click-node="false"
            :indent="16"
            node-key="id"
            :check-strictly="true"
            ref="tree"
            highlight-current
            @check-change="handleMenuCheckChange"
            :props="defaultProps">
            </el-tree>
        </div>
    </div>
</template>
<script>
import api from '@/api/api'
export default {
    props: ['type'],
    data () {
        return {
            roleActive: '',
            roleList: [],
            menuTree: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            menu: []
        }
    },
    created () {
        this.getMenuTree();
        this.getRoleList();
    },
    methods: {
        async getRoleList () {
            let res = await api.getRoleList(this.type);
            if (res.code === 0) {
                this.roleList = res.data;
                this.roleActive = res.data[0].id;
                this.getRoleMenu(this.roleActive);
            }
        },
        // 获取权限树
        async getMenuTree () {
            let res = await api.findMenuTree(this.type);
            if (res.code === 0) {
                this.menuTree = res.data;
            }
        },
        // 更据角色获取权限
        async getRoleMenu (id) {
            this.roleActive = id;
            let res = await api.getRoleMenu(id);
            if (res.code === 0) {
                this.$refs.tree.setCheckedNodes(res.data);
                this.menu = res.data;
            }
        },
        handleMenuCheckChange (data, check, subCheck) {
            if(check) {
				// 节点选中时同步选中父节点
				//let parentId = data.parentId
                //this.$refs.tree.setChecked(parentId, true, false)
                if (data.children != null) {
                    data.children.forEach(element => {
						this.$refs.tree.setChecked(element.id, true, false)
					});
                }
            } else {
				// 节点取消选中时同步取消选中子节点
				if(data.children != null) {
					data.children.forEach(element => {
						this.$refs.tree.setChecked(element.id, false, false)
					});
				}
			}
        },
        async save () {
            let checked = this.$refs.tree.getCheckedNodes(false, true);
            let roleMenu = [];
            checked.forEach(item => {
                let arr = {roleId: this.roleActive, menuId: item.id};
                roleMenu.push(arr);
            });
            let res = await api.saveRoleMenu(roleMenu);
            if (res.code === 0) {
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
                   
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../../static/css/access.scss';
</style>
<style lang="scss">
.el-tree .el-tree-node .el-tree-node .el-tree-node .el-tree-node__children{
    // display: flex;
    // flex-flow: wrap;
}
</style>