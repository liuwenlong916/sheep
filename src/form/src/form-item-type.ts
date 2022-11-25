import { Value } from 'async-validator'
import { ExtractPropTypes } from 'vue'
import { Layout } from './form-type'

export const formItemProps = {
  label: {
    type: String
  },
  field: {
    type: String
  }
} as const

export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export type LabelData = {
  layout: Layout
}

export type ItemContext = {
  validator: () => Promise<Value>
}
