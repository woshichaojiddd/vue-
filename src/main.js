import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import './plugins/vant.js'
import './assets/css/global.css'
import './assets/font/iconfont.css'


// 设置axios
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'
axios.interceptors.response.use(res => {
    return res.data
})

Vue.config.productionTip = false

// 定义日期格式转化的过滤器
Vue.filter('format', function(time) {
    const date = new Date(time)
        // padStart()字符串的方法  填充作用
    const y = (date.getFullYear() + '').padStart(2, 0)
    const m = (date.getMonth() + 1 + '').padStart(2, 0)
    const d = (date.getDate() + 1 + '').padStart(2, 0)
    const h = (date.getHours() + 1 + '').padStart(2, 0)
    const mm = (date.getMinutes() + 1 + '').padStart(2, 0)
    const s = (date.getSeconds() + 1 + '').padStart(2, 0)
    return `${y}-${m}-${d} ${h}:${mm}:${s}`
})


// 自定义指令
Vue.directive('focus', {
    inserted: function(el) {
        el.focus()
    }
})


new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')