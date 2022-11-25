import { PropType, ExtractPropTypes, InjectionKey } from 'vue'
import { Rules } from 'async-validator'
import { ItemContext } from './form-item-type'

export type Layout = 'horizontal' | 'vertical'
export const formProps = {
  model: {
    type: Object,
    required: true
  },
  layout: {
    type: String as PropType<Layout>,
    default: 'vertical'
  },
  rules: {
    type: Object as PropType<Rules>
  }
} as const

export type FormProps = ExtractPropTypes<typeof formProps>

export type FormContext = {
  model: any
  rules?: Rules
  addItem: (item: ItemContext) => void
  removeItem: (item: ItemContext) => void
}

export const formContextToken: InjectionKey<FormContext> =
  Symbol('formContextToken')
