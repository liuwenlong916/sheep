import * as inquirer from 'inquirer'
//eslint方式
//import inquirer from 'inquirer'
import { red } from 'kolorist'

// create type 支持项
const CREATE_TYPES = ['component', 'lib-entry']
// 文档分类
const DOCS_CATEGORIES = ['通用', '导航', '反馈', '数据录入', '数据展示', '布局']

export default async function onCreate(args = { type: '' }) {
  let { type } = args
  //未设置type
  if (!type) {
    //输出提示信息
    const result = await inquirer.prompt([
      {
        name: 'type',
        type: 'list',
        message: '（必填）请选择类型：',
        choices: CREATE_TYPES,
        default: 0
      }
    ])
    type = result.type
  }

  //设置错误
  if (CREATE_TYPES.every(t => type != t)) {
    console.log(red(`类型错误，仅支持${CREATE_TYPES.join(', ')}，请重新选择`))
    return onCreate()
  }

  //type通过后，根据type进行下一步
  try {
    switch (type) {
      case 'component':
        const info = await inquirer.prompt([
          {
            name: 'name',
            type: 'input',
            message: '（必填）请输入组件name',
            validate: (value: string) => {
              if (value.trim() === '') {
                return '必填项'
              }
              return true
            }
          },
          {
            name: 'title',
            type: 'input',
            message: '（必填）请输入组件title，中文名',
            validate: (value: string) => {
              if (value.trim() === '') {
                return '必填项'
              }
              return true
            }
          },
          {
            name: 'category',
            type: 'list',
            message: '（必填）请选择组件分类',
            choices: DOCS_CATEGORIES,
            default: 0
          }
        ])
        createComponent(info)
        break
      default:
        break
    }
  } catch (e) {
    console.log(red('X') + e.toString())
    process.exit(1)
  }
}

function createComponent(info) {
  console.log(info)
}
