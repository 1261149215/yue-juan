// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui';
import { Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/assets/styles/variable.scss';
import '@/assets/styles/base.scss';
import '@/assets/styles/common.scss';
import '@/assets/styles/iconfont.css';

import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'
import md5 from 'js-md5'

import '@/style/css/index.css';
import '@/utils/permission.js' // 非法链接进入，控制页面登陆状态，才能进入功能页
import "babel-polyfill";

Vue.prototype.$md5 = md5
Vue.config.productionTip = false

// Vue.prototype.openLoading = function() {
//     const loading = this.$loading({ // 声明一个loading对象
//             lock: true, // 是否锁屏
//             text: '正在加载...', // 加载动画的文字
//             spinner: 'el-icon-loading', // 引入的loading图标
//             background: 'rgba(0, 0, 0, 0.5)', // 背景颜色
//             // target: '.sub-main', // 需要遮罩的区域
//             body: true,
//             customClass: 'mask' // 遮罩层新增类名
//         })
//         // setTimeout(function() { // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
//         //     loading.close(); // 关闭遮罩层
//         // }, 5000)
//     return loading;
// }
router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('Admin-Token');
    if (!to.meta.requireAuth) {
        next()
    } else {
        token ? next() : next({path: '/login', query: {path: to.fullPath}})
    }
})
Vue.use(ElementUI);
/* eslint-disable no-new */

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})