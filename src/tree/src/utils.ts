import { IInnerTreeNode, ITreeNode } from './tree-type'

export function generateInnerTree(
  tree: ITreeNode[],
  level = 0,
  parentId?: string
): IInnerTreeNode[] {
  level++
  return tree.reduce((prev: IInnerTreeNode[], curr) => {
    const o = Object.assign({}, curr) as IInnerTreeNode
    o.level = level
    if (parentId) {
      o.parentId = parentId
    }
    if (curr.children && curr.children.length > 0) {
      const children = generateInnerTree(
        curr.children,
        level,
        curr.id
      ) as IInnerTreeNode[]
      //TODO:
      delete o.children
      return prev.concat(o, children)
    } else {
      o.isLeaf = true
      return prev.concat(o)
    }
  }, [])
}
