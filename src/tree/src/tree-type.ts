import { PropType, ExtractPropTypes } from 'vue'
import { IDragdrop } from './composables/use-tree-type'

export const treeProps = {
  data: {
    type: Object as PropType<Array<ITreeNode>>,
    required: true
  },
  checkable: {
    type: Boolean,
    default: false
  },
  operable: {
    type: Boolean,
    default: false
  },
  dragdrop: {
    type: [Boolean, Object] as PropType<IDragdrop>,
    default: false
  },
  accordion: {
    type: Boolean,
    default: false
  }
} as const

export type TreeProps = ExtractPropTypes<typeof treeProps>

export interface ITreeNode {
  label: string
  id: string
  children?: ITreeNode[]

  selected?: boolean
  checked?: boolean
  inChecked?: boolean
  expended?: boolean
  loading?: boolean
  childrenCount?: number
  lazyLoad?: boolean

  disableSelect?: boolean
  disableCheck?: boolean
  disableToggle?: boolean
}

export interface IInnerTreeNode extends ITreeNode {
  parentId?: string
  level: number
  isLeaf?: boolean
}
