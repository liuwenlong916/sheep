import { ref, computed, Ref, unref } from 'vue'
import { IInnerTreeNode, ITreeNode } from '../tree-type'
import { generateInnerTree } from '../utils'
export default function useTree(tree: ITreeNode[] | Ref<ITreeNode[]>) {
  const data = unref(tree)
  const innerData = ref(generateInnerTree(data))

  const toggleNode = (node: IInnerTreeNode) => {
    const cur = innerData.value.find(item => item.id === node.id)
    cur && (cur.expanded = !cur.expanded)
  }
  const expandTree = computed(() => {
    const result: IInnerTreeNode[] = []
    let excludeNodes: IInnerTreeNode[] = []
    for (const node of innerData.value) {
      if (excludeNodes.map(item => item.id).includes(node.id)) {
        continue
      }
      if (!node.expanded) {
        excludeNodes = getChildren(node)
      }

      result.push(node)
    }
    return result
  })

  const getChildren = (parent: IInnerTreeNode) => {
    const result: IInnerTreeNode[] = []
    let index = innerData.value.findIndex(item => item.id == parent.id) + 1
    while (
      index < innerData.value.length &&
      innerData.value[index].level > parent.level
    ) {
      result.push(innerData.value[index])
      index++
    }
    return result
  }
  return {
    expandTree,
    innerData,
    toggleNode
  }
}
