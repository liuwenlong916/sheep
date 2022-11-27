import { App } from 'vue'
import DModal from './src/modal'

//具名导出
export { DModal }

//导出插件
export default {
  install(app: App) {
    app.component(DModal.name, DModal)
  }
}
