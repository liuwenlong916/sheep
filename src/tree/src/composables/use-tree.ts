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
  //获去所有 显示的节点
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

  const toggleCheckNode = (node: IInnerTreeNode) => {
    node.checked = !node.checked
    // if (node.isLeaf) {
    checkedParent(node)
    // } else {
    checkedChildren(node)
    // }
  }

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
    expandTree,
    innerData,
    toggleNode,
    getChildren,
    toggleCheckNode
  }
}
