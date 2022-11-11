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
    //载节点默认折叠
    if (!!curr.lazyLoad && curr.expended) {
      curr.expended = false
    }
    //如果是懒加载节点，忽略他的孩子节点，由异步生成
    if (
      curr.children &&
      curr.children.length > 0 &&
      (curr.lazyLoad == undefined || !curr.lazyLoad)
    ) {
      const children = generateInnerTree(
        curr.children,
        level,
        curr.id
      ) as IInnerTreeNode[]
      //可选参数，才可以被删除
      delete o.children
      return prev.concat(o, children)
    } else {
      if (o.isLeaf == undefined) {
        o.isLeaf = true
      }
      return prev.concat(o)
    }
  }, [])
}
