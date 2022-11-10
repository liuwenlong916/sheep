import { Ref } from 'vue'
import { IInnerTreeNode } from '../../tree-type'
import { IUseCheck, IUseCore } from '../use-tree-type'

export default function useCheck(
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore
): IUseCheck {
  const { expandTree, getChildren } = core
  const toggleCheckNode = (node: IInnerTreeNode) => {
    node.checked = !node.checked
    // if (node.isLeaf) {
    checkedParent(node)
    // } else {
    checkedChildren(node)
    // }
  }
  //内部方法
  const checkedParent = (childNode: IInnerTreeNode) => {
    if (!childNode.parentId) return
    const parentNode: IInnerTreeNode | undefined = expandTree.value.find(
      item => item.id == childNode.parentId
    )
    if (parentNode) {
      const children: IInnerTreeNode[] = getChildren(parentNode)
      const checkedSiblingNodes = children.filter(item => item.checked)
      parentNode.checked = checkedSiblingNodes.length === children.length
      parentNode.inChecked =
        checkedSiblingNodes.length > 0 && !parentNode.checked
      checkedParent(parentNode)
    }
  }
  const checkedChildren = (parentNode: IInnerTreeNode) => {
    const children: IInnerTreeNode[] = getChildren(parentNode)
    children.forEach(child => {
      child.checked = parentNode.checked
    })
  }
  return {
    toggleCheckNode
  }
}
