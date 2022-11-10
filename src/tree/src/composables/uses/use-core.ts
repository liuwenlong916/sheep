import { computed, Ref } from 'vue'
import { IInnerTreeNode } from '../../tree-type'
import { IUseCore } from '../use-tree-type'

export default function useCore(innerData: Ref<IInnerTreeNode[]>): IUseCore {
  //获去所有 显示的节点
  const expandTree = computed(() => {
    const result: IInnerTreeNode[] = []
    let excludeNodes: IInnerTreeNode[] = []
    for (const node of innerData.value) {
      if (excludeNodes.map(item => item.id).includes(node.id)) {
        continue
      }
      if (!node.expended) {
        excludeNodes = getChildren(node)
      }

      result.push(node)
    }
    return result
  })

  const getChildren = (parent: IInnerTreeNode, recursive = true) => {
    const result: IInnerTreeNode[] = []
    // let index = innerData.value.findIndex(item => item.id == parent.id) + 1
    let index = getIndex(parent.id) + 1
    if (recursive) {
      while (
        index < innerData.value.length &&
        innerData.value[index].level > parent.level
      ) {
        result.push(innerData.value[index])
        index++
      }
    } else {
      while (
        index < innerData.value.length &&
        innerData.value[index].level == parent.level + 1
      ) {
        result.push(innerData.value[index])
        index++
      }
    }

    return result
  }

  const getExpandedChildren = (
    parent: IInnerTreeNode,
    result: IInnerTreeNode[] = []
  ) => {
    const childrenNode = getChildren(parent, false)
    result.push(...childrenNode)
    childrenNode.forEach(child => {
      child.expended && getExpandedChildren(child, result)
    })
    return result
  }
  const getNode = (id: string) => {
    const node = innerData.value.find(item => item.id == id) as IInnerTreeNode
    return node
  }

  const getIndex = (id: string) => {
    return innerData.value.findIndex(item => item.id == id)
  }
  return {
    expandTree,
    getChildren,
    getExpandedChildren,
    getNode,
    getIndex
  }
}
