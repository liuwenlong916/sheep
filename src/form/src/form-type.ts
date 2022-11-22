import { PropType, ExtractPropTypes } from 'vue'
import { Rules } from 'async-validator'

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
