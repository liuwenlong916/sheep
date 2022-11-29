import { PropType, ExtractPropTypes } from 'vue'

export const inputProps = {
  modelValue: {
    type: String,
    default: ''
  },
  // modelValue: [String, Number],
  type: {
    type: String,
    default: 'text'
  },
  from: {
    type: String,
    default: 'formItem'
  },
  max: {
    type: Number,
    default: Infinity
  },
  min: {
    type: Number,
    default: -Infinity
  }
} as const

export type InputProps = ExtractPropTypes<typeof inputProps>
