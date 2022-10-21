import { App } from 'vue'
import DButton from './src/button'

//具名导出
export { DButton }

//导出插件
export default {
  install(app: App) {
    app.component(DButton.name, DButton)
  }
}
