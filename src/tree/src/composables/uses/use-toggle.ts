import { Ref, SetupContext } from 'vue'
import { IInnerTreeNode } from '../../tree-type'
import { IUseCore, IUseLazyLoad, IUseToggle } from '../use-tree-type'

export default function useToggle(
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore,
  content: SetupContext,
  { loadLazyNodes }: IUseLazyLoad
): IUseToggle {
  const toggleNode = (node: IInnerTreeNode, accordion: boolean) => {
    const { getNode, getSameLevelNodes } = core
    const cur = getNode(node)
    if (cur) {
      if (!!cur.lazyLoad) {
        //懒加载，成功后再设置expended
        loadLazyNodes(cur)
      } else {
        cur.expended = !cur.expended
      }
      if (accordion) {
        const sameLevels = getSameLevelNodes(cur)
        sameLevels.map(item => {
          item.expended = false
        })
      }
    }
  }
  return {
    toggleNode
  }
}
