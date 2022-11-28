import { PropType, ExtractPropTypes } from 'vue'

export const inputProps = {
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  from: {
    type: String,
    default: 'formItem'
  }
} as const

export type InputProps = ExtractPropTypes<typeof inputProps>
