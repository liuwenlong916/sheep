import { defineComponent, toRefs, provide, SetupContext } from 'vue'
import useTree from './composables/use-tree'
import { TreeProps, treeProps } from './tree-type'
import DTreeNode from './components/tree-node'
import DTreeNodeToggle from './components/tree-node-toggle'
export default defineComponent({
  name: 'DTree',
  props: treeProps,
  setup(props: TreeProps, content: SetupContext) {
    const { data, accordion } = toRefs(props)
    const { slots } = content
    // const {
    //   expandTree,
    //   toggleNode,
    //   getChildren,
    //   getExpandedChildren,
    //   toggleCheckNode,
    //   append,
    //   remove,
    //   onDragstart,
    //   onDrop
    // } = useTree(data, props, content)
    // provide('TREE_UTILS', {
    //   toggleNode,
    //   getChildren,
    //   getExpandedChildren,
    //   toggleCheckNode,
    //   append,
    //   remove,
    //   onDragstart,
    //   onDrop
    // })
    const usePlugins = useTree(data, props, content)
    provide('TREE_UTILS', usePlugins)
    return () => {
      return (
        <div class="s-tree">
          {usePlugins.expandTree.value.map(treeNode => (
            <DTreeNode {...props} treeNode={treeNode}>
              {{
                content: () => {
                  return slots.content
                    ? slots.content(treeNode)
                    : treeNode.label
                },
                expendIcon: () =>
                  slots.expendIcon ? (
                    slots.expendIcon({
                      toggleNode: usePlugins.toggleNode,
                      treeNode,
                      accordion: accordion.value
                    })
                  ) : (
                    <DTreeNodeToggle
                      expended={!!treeNode.expended}
                      onClick={() =>
                        usePlugins.toggleNode(treeNode, accordion.value)
                      }
                    ></DTreeNodeToggle>
                  ),
                loading: () =>
                  slots.loading ? (
                    slots.loading({ nodeData: treeNode })
                  ) : (
                    <span class="ml-1">loading...</span>
                  )
              }}
            </DTreeNode>
          ))}
        </div>
      )
    }
  }
})
