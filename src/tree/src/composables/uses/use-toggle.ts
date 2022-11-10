import { Ref } from 'vue'
import { IInnerTreeNode } from '../../tree-type'
import { IUseCore, IUseToggle } from '../use-tree-type'

export default function useToggle(
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore
): IUseToggle {
  const toggleNode = (node: IInnerTreeNode) => {
    const { getNode } = core
    const cur = getNode(node.id as string)
    cur && (cur.expended = !cur.expended)
  }
  return {
    toggleNode
  }
}
