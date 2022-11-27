// 配置文件
// import Theme from 'vitepress/dist/client/theme-default/index' TODO:
import Theme from 'vitepress/theme'
import { DButton } from '../../../src/button/index'
import { DTree } from '../../../src/tree/index'
import { DInput } from '../../../src/input/index'
import { DPagination, DPager } from '../../../src/pagination'
import { DForm, DFormItem } from '../../../src/form'
import { DModal } from '../../../src/modal'
import { DDialog } from '../../../src/dialog'
// import './demo-block.scss'
import '../../../src/index.scss'
// 主题样式
import 'vitepress-theme-demoblock/theme/styles/index.css'
// 插件的组件，主要是demo组件
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
import type { App } from 'vue'
import { ap } from 'vitest/dist/global-732f9b14'

export default {
  ...Theme,
  // 扩展应用程序实例
  enhanceApp({ app }: { app: App<never> }) {
    app.component('DButton', DButton)
    app.component('DInput', DInput)
    app.component('DTree', DTree)
    app.component('DPagination', DPagination)
    app.component('DPager', DPager)
    app.component('DForm', DForm)
    app.component('DFormItem', DFormItem)
    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
    app.component('DModal', DModal)
    app.component('DDialog', DDialog)
  }
}
