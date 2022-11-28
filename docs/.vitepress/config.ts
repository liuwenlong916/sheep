const sidebar = {
  '/': [
    { text: '快速开始', link: '/' },
    {
      text: '通用',
      children: [{ text: 'Button 按钮', link: '/components/button/' }]
    },
    {
      text: '导航',
      children: [{ text: '分页组件', link: '/components/pagination/' }]
    },
    {
      text: '反馈',
      children: [{ text: 'dialog', link: '/components/dialog/' }]
    },
    {
      text: '数据录入',
      children: [
        { text: 'form表单', link: '/components/form/' },
        { text: 'input-number', link: '/components/input-number/' }
      ]
    },
    {
      text: '数据展示',
      children: [{ text: 'tree组件', link: '/components/tree/' }]
    },
    { text: '布局' }
  ]
}
import { demoBlockPlugin } from 'vitepress-theme-demoblock'
const config = {
  themeConfig: { sidebar },
  markdown: {
    config(md) {
      //这里使用markdown-it 插件
      // const { demoBlockPlugin } = require('vitepress-theme-demoblock')
      md.use(demoBlockPlugin)
    }
  }
}
export default config
