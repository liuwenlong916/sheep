import { ref, Ref, SetupContext, unref } from 'vue'
import { ITreeNode } from '../tree-type'
import { generateInnerTree } from '../utils'
import { TreeUtils } from './use-tree-type'
import useCheck from './uses/use-check'
import useCore from './uses/use-core'
import useOperate from './uses/use-operate'
import useToggle from './uses/use-toggle'
import useLazyLoad from './uses/use-lazy-load'
export default function useTree(
  tree: ITreeNode[] | Ref<ITreeNode[]>,
  content: SetupContext
): TreeUtils {
  const data = unref(tree)
  const innerData = ref(generateInnerTree(data))

  const core = useCore(innerData)

  const plugins = [useToggle, useCheck, useOperate]
  const lazyLoad = useLazyLoad(innerData, core, content)

  const pluginFunctions = plugins.reduce((res, plugin) => {
    return { ...res, ...plugin(innerData, core, content, lazyLoad) }
  }, {})

  return {
    innerData,
    ...core,
    ...pluginFunctions
  } as TreeUtils
}
