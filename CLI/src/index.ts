//命令行工具
import { Command } from 'commander'

import onCreate from '../command/create'

//1创建命令对象：
const cmd = new Command()

//注册命令、参数，回调
cmd
  .command('create')
  .description('创建一个组件的配置文件')
  .option('-t --type <type>', '创建类型，可选值：component,lib-entry') //<>必填 []选填
  .action(onCreate)

//执行命令行参数解析
cmd.parse()
