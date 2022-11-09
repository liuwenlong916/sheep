import { defineComponent, toRefs } from 'vue'
import useTree from './composables/use-tree'
import { TreeProps, treeProps } from './tree-type'
export default defineComponent({
  name: 'DTree',
  props: treeProps,
  setup(props: TreeProps, { slots, expose }) {
    const { data, checkable } = toRefs(props)
    const { expandTree, toggleNode, getChildren, toggleCheckNode } =
      useTree(data)
    // 节点高度
    const NODE_HEIGHT = 32

    expose({
      toggleNode
    })
    // 节点缩进大小
    const NODE_INDENT = 24
    return () => {
      return (
        <div class="s-tree">
          {expandTree.value.map(treeNode => (
            <div
              class="s-tree-node hover:bg-slate-300 relative "
              style={{
                paddingLeft: `${NODE_INDENT * (treeNode.level - 1)}px`,
                height: `${NODE_HEIGHT}px`
              }}
            >
              {/* 连接线 */}
              {!treeNode.isLeaf && treeNode.expanded && (
                <span
                  class="s-tree-node__vline absolute w-px bg-slate-300"
                  style={{
                    height: `${NODE_HEIGHT * getChildren(treeNode).length}px`,
                    left: `${NODE_INDENT * (treeNode.level - 1) + 12}px`,
                    top: `${NODE_HEIGHT}px`
                  }}
                ></span>
              )}
              {treeNode.isLeaf ? (
                <span style="width:25px; display:inline-block"></span>
              ) : slots.expendIcon ? (
                slots.expendIcon({ toggleNode, treeNode })
              ) : (
                <svg
                  onClick={() => {
                    toggleNode(treeNode)
                  }}
                  style={{
                    width: '25px',
                    height: '16px',
                    display: 'inline-block',
                    transform: treeNode.expanded ? 'rotate(90deg)' : ''
                  }}
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M384 192v640l384-320.064z"
                  ></path>
                </svg>
              )}
              {/* 选中 */}
              {checkable.value && (
                <span
                  class={`relative ${
                    treeNode.inChecked ? 's-tree__inChecked' : ''
                  }`}
                >
                  {treeNode.inChecked && (
                    <span
                      class="s-tree-checkbox__inner cursor-pointer"
                      onClick={() => toggleCheckNode(treeNode)}
                    ></span>
                  )}
                  <input
                    type="checkbox"
                    v-model={treeNode.checked}
                    onClick={() => toggleCheckNode(treeNode)}
                  />
                </span>
              )}
              {slots.content ? slots.content(treeNode) : treeNode.label}
            </div>
          ))}
        </div>
      )
    }
  }
})
