<template>
  <div class="layout">
    <div class="slider-wrapper" :style="{width: this.isCollapsed ? '64px':'220px'}">
      <el-menu
        background-color="#393D49"
        text-color="rgba(255,255,255,.7)"
        active-text-color="#fff"
        class="menu-wrapper"
        router
        unique-opened
        :collapse="isCollapsed"
        :default-active="$route.path"
        :collapse-transition="false">
        <div class="logo-wrapper">
          <i class="logo"></i><span>阅卷后台管理系统</span>
        </div>
        <template v-for="(item, index) in sider_menu_data">
          <el-menu-item class="menu-item" v-if="!item.children" :index="item.path" :key="index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
          <el-submenu v-else :index="item.path" :key="'menu'+index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item class="menu-item" v-for="(sub_item, sub_index) in item.children" :index="sub_item.path"
                          :key="sub_index">
              <span slot="title" style="margin-left:12px;">{{sub_item.title}}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div class="topbar-wrapper" :style="{left: this.isCollapsed ? '64px':'220px'}">
      <div class="menu-collapse-wrapper float-left" @click="toggleMenu">
        <i class="el-icon-adm-menu" :style="{transform: 'rotateZ(' + (this.isCollapsed ? '90' : '0') + 'deg)'}"></i>
      </div>
      <!-- <div class="title float-left">阅卷后台管理系统</div> -->
      <ul class="menu-list float-right">
        <li v-if="user" class="menu-item" style="padding: 0;">
          <el-dropdown
            :show-timeout="10"
            :hide-timeout="10"
            @command="handleCommand"
            style="padding: 0 15px;">
            <div class="dropdown-content el-dropdown-link">
              <i class="icon el-icon-adm-usersetup"></i>
              <span class="text">{{user.name || user.username}}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">&emsp;切换账户&emsp;</el-dropdown-item>
              <el-dropdown-item command="b">&emsp;修改密码&emsp;</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <!-- <li class="menu-item">
          <i class="icon el-icon-adm-help"></i>
        </li> -->
        <li class="menu-item" @click="exit">
          <i class="icon iconfont el-icon-adm-exit"></i>
        </li>
      </ul>
    </div>
    <div class="content-wrapper" ref="content-wrapper" :style="{left: this.isCollapsed ? '64px':'220px'}">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <!--修改密码弹窗-->
    <reset-password v-model="passwordVisible" :id="id" @closeDialog="passwordVisible = false" title="修改我的登录密码" :exit="true"></reset-password>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import {removeToken} from '@/utils/common';
  import api from '@/api/api'
  import resetPassword from '../user/resetPassword'
  export default {
    created() {
      this.checkAuth();
    },
    components: {
      resetPassword
    },
    data() {
      return {
        sider_menu_data: [
          {
            path: '/home',
            title: '首页',
            icon: 'el-icon-adm-home'
          },
          {
            path: '/school',
            title: '学校管理',
            icon: 'el-icon-school'
          },
          {
            path: '/user',
            title: '用户管理',
            icon: 'el-icon-adm-user',
            children: [
              {path: '/user/index', title: '阅卷用户管理'},
              {path: '/user/admin', title: '后台用户管理'}
            ]
          },
          {
            path: '/access/index',
            title: '权限管理',
            icon: 'el-icon-adm-organization'
          },
          {
            path: '/config',
            title: '后台配置',
            icon: 'el-icon-s-tools',
            children: [
              {path: '/config/role', title: '角色配置'},
              {path: '/config/index', title: '权限配置'}
            ]
          },
          // {
          //   path: '/log/index',
          //   title: '操作日志',
          //   icon: 'el-icon-adm-log'
          // },{
          //   path: '/model/index',
          //   title: '模板设置',
          //   icon: 'el-icon-adm-project'
          // },
          {
            path: '/area/areaMange',
            title: '地区管理',
            icon: 'el-icon-edit-outline'
          }
        ],
        isCollapsed: false,
        adminMenuShow: false,
        passwordVisible: false,
        id: null
      }
    },
    computed: {
      ...mapGetters([
        'token',
        'user'
      ])
    },
    methods: {
      checkAuth() {
        this.getUser();
      },
      async getUser() {
        let res = await api.userInfo();
        if (res.code === 0) {
          this.$store.commit('SET_USER', res.data);
          this.id = res.data.id;
        }  
      },
      handleCommand(command) {
        if(command == 'a'){
          this.$store.commit('SET_TOKEN_ig', '');
          this.$store.commit('SET_USER', null);
          removeToken()
          this.$router.replace({path: '/login', query: {redirct: this.$route.path}});
        } else if (command == 'b') {
          this.passwordVisible = true;
        }
      },
      toggleMenu() {
        this.isCollapsed = !this.isCollapsed;
      },
      exit() {
        this.$confirm('即将退出系统登陆，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$store.commit('SET_TOKEN_ig', '');
          this.$store.commit('SET_USER', null);
          removeToken()
          this.$router.replace({path: '/login', query: {redirct: this.$route.path}});
        })
        .catch(() => {
          return false;
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/styles/variable';
    .slider-wrapper{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 199992;
      overflow: hidden;
      transition: all 0.3s ease-in-out;
      height: 100%;
    }
    .menu-wrapper {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 11;
      background-color: $siderbarBackgroundColor;
      transition: all 0.3s ease-in-out;
      .logo-wrapper {
        height: 40px;
        line-height: 40px;
        padding: 16px 0;
        text-align: center;
        font-size: 18px;
        color: rgba(255,255,255,.8);
        display: flex;
        justify-content: center;
        align-items: center;
        .logo {
          width: 30px;
          height: 30px;
          background: url('/static/logo.png') center no-repeat;
          background-size: 100%;
          margin-right: 5px;
        }
      }
      
      i {
        color: #FFFFFF;
      }
      
      .menu-item {
        &.is-active{
          background-color: #409eff !important;
          i {
            color: #409EFF !important;
          }
        }
        
      }
      
      .el-submenu__title:hover {
        color: #409EFF !important;
        
        i {
          color: #409EFF !important;
        }
      }
      
      .el-submenu, .el-menu-item {
        width: 100%;
      }
    }
    .menu-wrapper::-webkit-scrollbar {/*滚动条整体样式*/
      width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }

    .menu-wrapper::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: #409EFF ;
    }

    .menu-wrapper::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 10px;
      background: #EDEDED;
    }
  
  .topbar-wrapper {
    position: fixed;
    left: $siderbarWidth;
    right: 0 !important;
    top: 0;
    height: $topbarHeight;
    line-height: $topbarHeight;
    padding: 0 24px 0 0;
    background-color: $topbarBackgroundColor;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    transition: all 0.3s ease-in-out;
    z-index: 12;
    
    .menu-collapse-wrapper {
      height: 100%;
      width: 48px;
      text-align: center;
      cursor: pointer;
      
      i {
        transition: all 0.3s ease-in-out;
      }
    }
    
    .title {
      height: 100%;
      font-weight: bold;
    }
    
    .menu-list {
      .menu-item {
        position: relative;
        float: left;
        padding: 0 15px;
        min-width: 45px;
        height: 48px;
        text-align: center;
        font-size: 0px;
        
        &:hover {
          cursor: pointer;
          background-color: #F5F5F5;
        }
        
        .icon {
          vertical-align: middle;
          font-size: 24px;
        }
        
        .text {
          display: inline-block;
          vertical-align: middle;
          margin-left: 4px;
          font-size: 16px;
        }
      }
    }
  }
  
  .content-wrapper {
    position: absolute;
    left: $siderbarWidth;
    right: 0;
    top: $topbarHeight;
    bottom: 0;
    padding: 16px;
    overflow: auto;
    transition: all 0.3s ease-in-out;
    
    .content {
      position: relative;
      width: 100%;
      height: 100%;
      // background: #fff;
    }
  }
</style>
