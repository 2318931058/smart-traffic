import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 配置echarts
import 'echarts'
import ECharts from 'vue-echarts'

export const app = createApp(App)
// 全局注册组件（也可以使用局部注册）
app.component('v-chart', ECharts)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
