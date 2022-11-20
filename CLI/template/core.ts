import { upperFirst } from './utils'
export function genCoreTemplate(name) {
  const upperName = upperFirst(name)
  const compName = `D${upperName}`
  const propsTypeName = `${upperName}Props`
  const propsName = `${name}Props`
  const propsFileName = `./${name}-type`
  const className = `s-${name}`
  return `\
import { defineComponent, toRefs } from 'vue'
import { ${propsTypeName}, ${propsName} } from '${propsFileName}'
export default defineComponent({
  name: '${compName}',
  props: ${propsName},
  setup(props: ${propsTypeName}) {
    return () => {
      return <div class="${className}">${compName}</div>
    }
  }
})
`
}
