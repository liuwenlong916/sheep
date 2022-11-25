// 入口文件
// 1.引入组件批量导出
// 2.导出组件
// 3.导出vue插件（vue.use）

import type { App } from 'vue'
import ButtonPlugin, { DButton } from '../src/button'
import InputPlugin, { DInput } from '../src/input'
import TreePlugin, { DTree } from '../src/tree'
import FormPlugin, { DForm, DFormItem } from '../src/form'
import PaginationPlugin, { DPagination, DPager } from '../src/pagination'
//单个导出
export { DButton, DTree, DForm, DPagination, DPager, DFormItem, DInput }

//全局导出
const installs = [
  ButtonPlugin,
  TreePlugin,
  PaginationPlugin,
  FormPlugin,
  InputPlugin
]
export default {
  install(app: App) {
    installs.forEach(p => app.use(p))
  }
}
