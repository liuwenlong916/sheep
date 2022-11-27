import { PropType, ExtractPropTypes } from 'vue'

export const modalProps = {
  modelValue: {
    type: Boolean,
    default: false
  }
} as const

export type ModalProps = ExtractPropTypes<typeof modalProps>
