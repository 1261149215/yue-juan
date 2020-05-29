<template>
    <div>
        <div class="access">
            <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
                <el-tab-pane label="系统权限管理" name="first">
                    <access-list :type='1'></access-list>
                </el-tab-pane>
                <el-tab-pane label="考试权限管理" name="second"><access-list :type='2'></access-list></el-tab-pane>
                <el-tab-pane label="后台权限管理" name="third"><access-list :type='3'></access-list></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import accessList from './SetAccess'
export default {
    data () {
        return {
            activeName: "first"
        }
        
    },
    components: {
        accessList
    },
    created () {
    },
    methods: {
        handleClick () {
        }
    }
}
</script>
<style scoped lang="scss">
.content {
    background: #fff;
}

</style>
<style lang="scss" >
.access .el-tabs__content{
    background: #fff;
    height: auto;
    position: absolute;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    top: 80px;
    right: 0;
    left: 0;
    bottom: 0;
}
.access .el-tabs__header {
    padding: 0 40px;
    background: #fff;
    margin-bottom: 20px;
}
.access .el-tabs__nav-wrap::after {
    background: #fff;
}
.access .el-tabs__item {
    margin: 10px 0;
    font-size: 16px;
}
.access .el-tabs__nav-wrap {
    width: 400px;
}
.access .el-tab-pane {
    height: 100%;
}
</style>