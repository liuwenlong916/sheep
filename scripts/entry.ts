// 入口文件
// 1.引入组件批量导出
// 2.导出组件
// 3.导出vue插件（vue.use）

import type { App } from 'vue'
import ButtonPlugin, { DButton } from '../src/button'

export { DButton }

const installs = [ButtonPlugin]
export default {
  install(app: App) {
    installs.forEach(p => app.use(p))
  }
}
