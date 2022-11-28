import { App } from 'vue'
import DInputNumber from './src/input-number'

//具名导出
export { DInputNumber }

//导出插件
export default {
  install(app: App) {
    app.component(DInputNumber.name, DInputNumber)
  }
}
