import { App } from 'vue'
import DPagination from './src/pagination'
import DPager from './src/components/pager'

//具名导出
export { DPagination, DPager }

//导出插件
export default {
  install(app: App) {
    app.component(DPagination.name, DPagination)
    app.component(DPager.name, DPager)
  }
}
