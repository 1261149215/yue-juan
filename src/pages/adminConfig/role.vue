<template>
    <div>
        <div class="my_con">
            <el-tabs v-model="activeName"  stretch>
                <el-tab-pane label="前台系统角色" name="first">
                    <role-list :type='1'></role-list>
                </el-tab-pane>
                <el-tab-pane label="考试阅卷角色" name="second"><role-list :type='2'></role-list></el-tab-pane>
                <el-tab-pane label="后台用户角色" name="third"><role-list :type='3'></role-list></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import roleList from './roleList'
export default {
    data () {
        return {
            activeName: 'first'
        }
    },
    components: {
        roleList
    }
}
</script>
<style scoped lang="scss">
.content {
    background: #fff;
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
}
</style>