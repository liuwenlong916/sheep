import { PropType, ExtractPropTypes } from 'vue'

export const dialogProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  showClose: {
    type: Boolean,
    default: true
  }
} as const

export type DialogProps = ExtractPropTypes<typeof dialogProps>
