import { App } from 'vue'
import DDialog from './src/dialog'

//具名导出
export { DDialog }

//导出插件
export default {
  install(app: App) {
    app.component(DDialog.name, DDialog)
  }
}
