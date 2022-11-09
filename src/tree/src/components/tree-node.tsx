import { defineComponent, inject, toRefs } from 'vue'
import { IInnerTreeNode } from '../tree-type'
import { TreeNodeProps, treeNodeProps } from '../tree-node-type'

export default defineComponent({
  name: 'DTreeNode',
  props: treeNodeProps,
  setup(props: TreeNodeProps, { slots }) {
    return () => {
      // 节点高度
      const NODE_HEIGHT = 32
      // 节点缩进大小
      const NODE_INDENT = 24
      const { treeNode, checkable } = toRefs(props)
      type TreeUtils = {
        toggleNode: (treeNode: IInnerTreeNode) => void
        getChildren: (treeNode: IInnerTreeNode) => IInnerTreeNode[]
        toggleCheckNode: (treeNode: IInnerTreeNode) => void
      }
      const { toggleNode, getChildren, toggleCheckNode } = inject(
        'TREE_UTILS'
      ) as TreeUtils

      return (
        <div
          class="s-tree-node hover:bg-slate-300 relative "
          style={{
            paddingLeft: `${NODE_INDENT * (treeNode.value.level - 1)}px`,
            height: `${NODE_HEIGHT}px`
          }}
        >
          {/* 连接线 */}
          {!treeNode.value.isLeaf && treeNode.value.expended && (
            <span
              class="s-tree-node__vline absolute w-px bg-slate-300"
              style={{
                height: `${NODE_HEIGHT * getChildren(treeNode.value).length}px`,
                left: `${NODE_INDENT * (treeNode.value.level - 1) + 12}px`,
                top: `${NODE_HEIGHT}px`
              }}
            ></span>
          )}
          {treeNode.value.isLeaf ? (
            <span style="width:25px; display:inline-block"></span>
          ) : (
            slots.expendIcon && slots.expendIcon()
          )}
          {/* 选中 */}
          {checkable.value && (
            <span
              class={`relative ${
                treeNode.value.inChecked ? 's-tree__inChecked' : ''
              }`}
            >
              {treeNode.value.inChecked && (
                <span
                  class="s-tree-checkbox__inner cursor-pointer"
                  onClick={() => toggleCheckNode(treeNode.value)}
                ></span>
              )}
              <input
                type="checkbox"
                v-model={treeNode.value.checked}
                onClick={() => toggleCheckNode(treeNode.value)}
              />
            </span>
          )}
          {slots.content && slots.content()}
        </div>
      )
    }
  }
})
