// 配置文件
// import Theme from 'vitepress/dist/client/theme-default/index' TODO:
import Theme from 'vitepress/theme'
import { DButton } from '../../../src/button/index'
import { DTree } from '../../../src/tree/index'
// 主题样式
import 'vitepress-theme-demoblock/theme/styles/index.css'
// 插件的组件，主要是demo组件
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
import type { App } from 'vue'

export default {
  ...Theme,
  // 扩展应用程序实例
  enhanceApp({ app }: { app: App<never> }) {
    app.component('DButton', DButton)
    app.component('DTree', DTree)
    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
  }
}
