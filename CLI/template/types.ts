import { upperFirst } from './utils'
export function genTypeTemplate(name) {
  const upperName = upperFirst(name)
  const propsTypeName = `${upperName}Props`
  const propsName = `${name}Props`
  return `\
import { PropType, ExtractPropTypes } from 'vue'

export const ${propsName} = {} as const

export type ${propsTypeName} = ExtractPropTypes<typeof ${propsName}>
`
}
