import { upperFirst } from './utils'
export function genIndexTemplate(name) {
  const upperName = upperFirst(name)
  const compName = `D${upperName}`
  return `\
import { App } from 'vue'
import ${compName} from './src/${name}'

//具名导出
export { ${compName} }

//导出插件
export default {
  install(app: App) {
    app.component(${compName}.name, ${compName})
  }
}
`
}
