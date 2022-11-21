import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './index.scss'
import Button from './button'
import Form from './form'

//使用全量导出
// import sheepUI from '../build/d-ui.js'
// import sheepUI from '../build'
//按需打包
// import sheepUI from '../build/button'

// import sheepUI from 'db-sheep-ui'

createApp(App).use(Button).use(Form).mount('#app')
