import { ComputedRef, Ref } from 'vue'
import { IInnerTreeNode } from '../tree-type'

export type IUseCore = {
  expandTree: ComputedRef<IInnerTreeNode[]>
  getExpandedChildren: (treeNode: IInnerTreeNode) => IInnerTreeNode[]
  getChildren: (
    treeNode: IInnerTreeNode,
    recursive?: boolean
  ) => IInnerTreeNode[]
  getNode: (id: string) => IInnerTreeNode
  getIndex: (id: string) => number
}
//展开折叠
export type IUseToggle = {
  toggleNode: (treeNode: IInnerTreeNode) => void
}

export type IUseCheck = {
  toggleCheckNode: (treeNode: IInnerTreeNode) => void
  // checkedParent: (treeNode: IInnerTreeNode) => void
  // checkedChildren: (treeNode: IInnerTreeNode) => void
}
export type IUseOperate = {
  append: (treeNode: IInnerTreeNode, label: string) => void
  remove: (treeNode: IInnerTreeNode) => void
}

export type TreeUtils = { innerData: Ref<IInnerTreeNode[]> } & IUseCore &
  IUseToggle &
  IUseCheck &
  IUseOperate
