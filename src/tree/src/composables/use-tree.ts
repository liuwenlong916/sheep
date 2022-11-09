import { ref, computed, Ref, unref } from 'vue'
import { IInnerTreeNode, ITreeNode } from '../tree-type'
import { generateInnerTree } from '../utils'
export default function useTree(tree: ITreeNode[] | Ref<ITreeNode[]>) {
  const data = unref(tree)
  const innerData = ref(generateInnerTree(data))

  const toggleNode = (node: IInnerTreeNode) => {
    const cur = innerData.value.find(item => item.id === node.id)
    cur && (cur.expended = !cur.expended)
  }
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
    let index = innerData.value.findIndex(item => item.id == parent.id) + 1
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

  const append = (parentNode: IInnerTreeNode, label: string) => {
    const childrenNode = getChildren(parentNode) //始终返回数组
    const latestNode = childrenNode[childrenNode.length - 1]
    let insertIndex = 0
    if (latestNode) {
      insertIndex = innerData.value.findIndex(item => item.id == latestNode.id)
    } else {
      insertIndex = innerData.value.findIndex(item => item.id == parentNode.id)
    }

    parentNode.expended = true
    parentNode.isLeaf = false

    const insertNode = ref({
      label,
      level: parentNode.level + 1,
      parentId: parentNode.id,
      isLeaf: true
    })

    console.log(insertIndex + 1, parentNode, label, insertNode.value)
    innerData.value.splice(insertIndex + 1, 0, insertNode.value)
  }
  const remove = (node: IInnerTreeNode) => {
    const childrenNode = getChildren(node)
    innerData.value = innerData.value.filter(
      item => item.id !== node.id && !childrenNode.includes(item)
    )

    //父节点无孩子转叶子节点
    const parentNode = innerData.value.find(item => (item.id = node.parentId))
    if (parentNode) {
      const childrenNode2 = getChildren(parentNode)
      if (childrenNode2.length === 0) {
        parentNode.expended = false
        parentNode.isLeaf = true
      }
    }
  }
  return {
    expandTree,
    innerData,
    toggleNode,
    getChildren,
    getExpandedChildren,
    toggleCheckNode,
    append,
    remove
  }
}
