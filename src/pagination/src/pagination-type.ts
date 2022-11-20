import { PropType, ExtractPropTypes } from 'vue'

export const paginationProps = {
  total: { type: Number, required: true },

  pagerSize: { type: Number, default: 5 },
  pageSize: { type: Number, default: 10 },
  pageSizes: Object as PropType<Array<Number>>,
  modelValue: { type: Number, default: 1 }
} as const

export type PaginationProps = ExtractPropTypes<typeof paginationProps>
