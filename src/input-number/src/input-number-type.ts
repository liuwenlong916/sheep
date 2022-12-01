import { ExtractPropTypes, PropType } from 'vue'
export type IModelValueType = string | number
export const inputNumberProps = {
  modelValue: {
    type: [String, Number] as PropType<IModelValueType>,
    default: null
  },
  step: {
    type: Number,
    default: 1
  },
  stepStrictly: {
    type: Boolean,
    default: false
  },
  precision: {
    type: Number,
    default: 0
  },
  controls: {
    type: Boolean,
    default: true
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

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>
