import { App } from 'vue'
import DForm from './src/form'
import DFormItem from './src/form-item'

//具名导出
export { DForm, DFormItem }

//导出插件
export default {
  install(app: App) {
    app.component(DForm.name, DForm)
    app.component(DFormItem.name, DFormItem)
  }
}
