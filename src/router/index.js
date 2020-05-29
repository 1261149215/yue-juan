import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/layout/layout';
Vue.use(Router)

// 定义路由
export const routerlists = [
    {
        path: '/',
        redirect: '/login',
        component: () =>
            import ('@/pages/login/login')
    },
    {
        path: '/login', // 登录
        name: 'login',
        meta: {
            title: 'Login - 登录'
        },
        component: () =>
            import ('@/pages/login/login')
    },
    {
        path: '/error/:code',
        name: 'error',
        meta: {
            title: 'error'
        },
        component: () =>
            import ('@/pages/error/index')
    },
    {
        path: '',
        name: 'otherRouter',
        redirect: '/home',
        meta: {
            requireAuth: true
        },
        component: Layout,
        children: [{
            path: 'home',
            name: 'home',
            title: '首页',
            component: () =>
                import ('@/pages/home/home')
        }]
    },
    {
        path: '/school',
        name: 'school',
        meta: {
            requireAuth: true
        },
        component: Layout,
        children: [{
            path: '/school',
            name: 'school',
            component: () =>
                import ('@/pages/school/index')
        }]
    },
    {
        path: '/user',
        name: 'user',
        title: '用户管理',
        meta: {
            requireAuth: true
        },
        component: Layout,
        children: [{
            path: 'index',
            name: 'user',
            title: '阅卷用户管理',
            component: () =>
                import ('@/pages/user/index')
        }, {
            path: 'admin',
            name: 'stuadmindent',
            title: '后台用户管理',
            component: () =>
                import ('@/pages/user/adminUser')
        }, ]
    },
    {
        path: '/access',
        name: 'access',
        title: '权限管理',
        meta: {
            requireAuth: true
        },
        component: Layout,
        children: [{
            path: 'index',
            name: 'access_index',
            title: '系统权限管理',
            component: () =>
                import ('@/pages/access/index')
        }]
    },
    {
        path: '/config',
        name: 'config',
        meta: {
            requireAuth: true
        },
        component: Layout,
        children: [{
            path: 'index',
            name: 'access_index',
            title: '后台配置',
            component: () =>
                import ('@/pages/adminConfig/index')
        },{
            path: 'role',
            name: 'role',
            title: '角色配置',
            component: () =>
                import ('@/pages/adminConfig/role')
        }]
    },
    {
        path: '/log',
        name: 'log',
        title: '日志管理',
        meta: {
            requireAuth: true
        },
        component: Layout,
        children: [{
            path: 'index',
            name: 'log_index',
            title: '操作日志',
            component: () =>
                import ('@/pages/log/index')
        }]
    },
    {
        path: '/model',
        name: 'model',
        title: '模板管理',
        meta: {
            requireAuth: true
        },
        component: Layout,
        children: [{
            path: 'index',
            name: 'model_index',
            title: '模板设置',
            component: () =>
                import ('@/pages/model/index')
        }, {
            path: 'add/:id',
            name: 'model_add',
            title: '模板添加',
            component: () =>
                import ('@/pages/model/add')
        }, {
            path: 'check/:id/:table',
            name: 'model_check',
            title: '模板查看',
            component: () =>
                import ('@/pages/model/check_bak')
        }]
    },
    {
        path: '/area',
        name: 'area',
        component: Layout,
        title: '地区管理',
        children: [{
          path: 'areaMange',
          name: 'areaMange',
          title: '地区管理',
          component: () =>
          import ('@/pages/area/areaMange')
        }]
        
    },
]

// 路由初始化
export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: routerlists
})
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}