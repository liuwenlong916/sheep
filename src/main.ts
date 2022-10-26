import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './index.scss'
// import Button from './button'

//使用全量导出
// import sheepUI from '../build/d-sheep-ui.js'
import sheepUI from '../build'

createApp(App).use(sheepUI).mount('#app')
