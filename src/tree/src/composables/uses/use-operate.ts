import { Ref, ref } from 'vue'
import { IInnerTreeNode } from '../../tree-type'
import { IUseCore, IUseOperate } from '../use-tree-type'
import { randonId } from '../../../../share/utils'

export default function useOperate(
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore
): IUseOperate {
  const { getChildren, getIndex } = core
  const append = (parentNode: IInnerTreeNode, label: string) => {
    const childrenNode = getChildren(parentNode) //始终返回数组
    const latestNode = childrenNode[childrenNode.length - 1]
    let insertIndex = 0
    if (latestNode) {
      insertIndex = getIndex(latestNode.id) //innerData.value.findIndex(item => item.id == latestNode.id)
    } else {
      insertIndex = getIndex(parentNode.id) //innerData.value.findIndex(item => item.id == parentNode.id)
    }

    parentNode.expended = true
    parentNode.isLeaf = false

    const insertNode = ref({
      id: randonId(),
      label,
      level: parentNode.level + 1,
      parentId: parentNode.id,
      isLeaf: true
    })

    innerData.value.splice(insertIndex + 1, 0, insertNode.value)
  }
  const remove = (node: IInnerTreeNode) => {
    const childrenNode = getChildren(node)
    innerData.value = innerData.value.filter(
      item => item.id !== node.id && !childrenNode.includes(item)
    )

    //父节点无孩子转叶子节点
    const parentNode = innerData.value.find(item => item.id == node.parentId)
    if (parentNode) {
      const childrenNode2 = getChildren(parentNode)
      if (childrenNode2.length === 0) {
        parentNode.expended = false
        parentNode.isLeaf = true
      }
    }
  }
  return {
    append,
    remove
  }
}
