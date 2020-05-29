<template>
    <div>
        <div class="my_con">
            <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
                <el-tab-pane label="系统权限" name="first">
                    <config-list :type='1'></config-list>
                </el-tab-pane>
                <el-tab-pane label="考试权限" name="second"><config-list :type='2'></config-list></el-tab-pane>
                <el-tab-pane label="后台权限" name="third"><config-list :type='3'></config-list></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import configList from './menu'
export default {
    data () {
        return {
            activeName: "first"
        }
        
    },
    components: {
        configList
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
.nav {

}
</style>
<style lang="scss">
.my_con .el-tabs__content{
    background: #fff;
    position: absolute;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    top: 80px;
    right: 0;
    left: 0;
    bottom: 0;
}
.my_con .el-tabs__header {
    padding: 0 40px;
    background: #fff;
    margin-bottom: 20px;
}
.my_con .el-tabs__nav-wrap::after {
    background: #fff;
}
.my_con .el-tabs__item {
    margin: 10px 0;
    font-size: 16px;
}
.my_con .el-tabs__nav-wrap {
    width: 400px;
}
.my_con .el-tab-pane {
    height: 100%;
    overflow: auto;
}
</style>