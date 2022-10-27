import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './index.scss'
import Button from './button'

//使用全量导出
// import sheepUI from '../build/d-ui.js'
// import sheepUI from '../build'
//按需打包
// import sheepUI from '../build/button'

createApp(App).use(Button).mount('#app')
