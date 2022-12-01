import { ComputedRef, Ref } from 'vue'
import { IInnerTreeNode, ITreeNode } from '../tree-type'

export type IUseCore = {
  expandTree: ComputedRef<IInnerTreeNode[]>
  getExpandedChildren: (treeNode: IInnerTreeNode) => IInnerTreeNode[]
  getChildren: (
    treeNode: IInnerTreeNode,
    recursive?: boolean
  ) => IInnerTreeNode[]
  getNode: (node: IInnerTreeNode) => IInnerTreeNode | undefined
  getNodeById: (id: string) => IInnerTreeNode | undefined
  getIndex: (id: string) => number
  getSameLevelNodes: (node: IInnerTreeNode) => IInnerTreeNode[]
}
//展开折叠
export type IUseToggle = {
  toggleNode: (treeNode: IInnerTreeNode, accordion: boolean) => void
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

export type IUseLazyLoad = {
  loadLazyNodes: (node: IInnerTreeNode) => void //派发事件
}
export type LazyNodeResult = {
  treeItems: ITreeNode[]
  node: IInnerTreeNode
}

export type IDragdrop = boolean | IDropType

export interface IDropType {
  dropPrev?: boolean
  dropNext?: boolean
  dropInner?: boolean
}

export type IDraggalbe = {
  onDragstart: (event: DragEvent, treeNode: IInnerTreeNode) => void
  onDragover: (event: DragEvent) => void
  onDragend: (event: DragEvent) => void

  onDrop: (event: DragEvent, treeNode: IInnerTreeNode) => void
}

export interface DragState {
  dropType?: keyof Required<IDropType>
  draggingNode?: HTMLElement | null
  draggingTreeNode?: IInnerTreeNode | null
}

export type TreeUtils = { innerData: Ref<IInnerTreeNode[]> } & IUseCore &
  IUseToggle &
  IUseCheck &
  IUseOperate &
  IDraggalbe
