import { defineComponent, toRefs, provide } from 'vue'
import useTree from './composables/use-tree'
import { TreeProps, treeProps } from './tree-type'
import DTreeNode from './components/tree-node'
import DTreeNodeToggle from './components/tree-node-toggle'
export default defineComponent({
  name: 'DTree',
  props: treeProps,
  setup(props: TreeProps, { slots, expose }) {
    const { data } = toRefs(props)
    const {
      expandTree,
      toggleNode,
      getChildren,
      getExpandedChildren,
      toggleCheckNode,
      append,
      remove
    } = useTree(data)
    provide('TREE_UTILS', {
      toggleNode,
      getChildren,
      getExpandedChildren,
      toggleCheckNode,
      append,
      remove
    })
    return () => {
      return (
        <div class="s-tree">
          {expandTree.value.map(treeNode => (
            <DTreeNode {...props} treeNode={treeNode}>
              {{
                content: () => {
                  return slots.content
                    ? slots.content(treeNode)
                    : treeNode.label
                },
                expendIcon: () =>
                  slots.expendIcon ? (
                    slots.expendIcon({ toggleNode, treeNode })
                  ) : (
                    <DTreeNodeToggle
                      expended={!!treeNode.expended}
                      onClick={() => toggleNode(treeNode)}
                    ></DTreeNodeToggle>
                  )
              }}
            </DTreeNode>
          ))}
        </div>
      )
    }
  }
})
