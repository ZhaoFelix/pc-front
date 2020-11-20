import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'viewerjs/dist/viewer.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import './permission' // permission control
import * as filters from './filters'  // 全局过滤器

// 引入全局指令
import permission from '@/directive/permission/index'
Vue.use(permission)

import waves from '@/directive/waves'
Vue.use(waves)


import viewer from 'v-viewer'
Vue.use(viewer,{
    defaultOptions: {
      zIndex: 9999,
      navbar:false,
      toolbar: {
        zoomIn: 4,
        prev: 4,
        reset: 4,
        next: 4,
        zoomOut: 4
      },
      title: 0
    }
  
})


// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key,filters[key])
})
Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
