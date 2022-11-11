import { SetupContext, Ref, ref } from 'vue'
import { IInnerTreeNode } from '../../tree-type'
import { generateInnerTree } from '../../utils'
import { IUseCore, IUseLazyLoad, LazyNodeResult } from '../use-tree-type'

export default function useLazyLoad(
  innerData: Ref<IInnerTreeNode[]>,
  { getNode, getIndex }: IUseCore,
  { emit }: SetupContext
): IUseLazyLoad {
  const loadLazyNodes = (node: IInnerTreeNode) => {
    const innerNode = getNode(node)
    if (
      innerNode &&
      !innerNode.expended &&
      !!innerNode.lazyLoad &&
      !innerNode.childrenCount
    ) {
      console.log('loading')
      innerNode.loading = true
      emit('lazy-load', node, callback)
    }
  }

  const callback = (result: LazyNodeResult) => {
    const { treeItems, node } = result
    const parentNode = getNode(node)
    if (parentNode) {
      parentNode.loading = false
      parentNode.expended = true
      //拍平
      const children = ref<IInnerTreeNode[]>(
        generateInnerTree(treeItems, parentNode.level + 1, parentNode.id)
      )
      parentNode.childrenCount = children.value.length
      //加入子节点
      const parentIndex = getIndex(parentNode.id)
      parentIndex &&
        innerData.value.splice(parentIndex + 1, 0, ...children.value)
    }
  }

  return {
    loadLazyNodes
  }
}
