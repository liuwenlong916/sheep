import { App } from 'vue'
import DTree from './src/tree'

//具名导出
export { DTree }

//导出插件
export default {
  install(app: App) {
    app.component(DTree.name, DTree)
  }
}
