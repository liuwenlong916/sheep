import { App } from 'vue'
import DInput from './src/input'

//具名导出
export { DInput }

//导出插件
export default {
  install(app: App) {
    app.component(DInput.name, DInput)
  }
}
