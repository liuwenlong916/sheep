import { defineComponent, inject, toRefs, ref } from 'vue'
import { IInnerTreeNode } from '../tree-type'
import { TreeNodeProps, treeNodeProps } from '../tree-node-type'
import { TreeUtils } from '../composables/use-tree-type'

export default defineComponent({
  name: 'DTreeNode',
  props: treeNodeProps,
  setup(props: TreeNodeProps, { slots }) {
    // 增加isShow控制操作按钮显示
    const isShow = ref(false)
    // 操作按钮触发
    const toggleOperate = () => {
      isShow.value = !isShow.value
    }

    return () => {
      // 节点高度
      const NODE_HEIGHT = 32
      // 节点缩进大小
      const NODE_INDENT = 24
      const { treeNode, checkable, operable } = toRefs(props)

      const {
        toggleCheckNode,
        getExpandedChildren,
        append,
        remove,
        onDragstart,
        onDragend,
        onDrop
      } = inject('TREE_UTILS') as TreeUtils

      const dragdrop = {
        draggable: true,
        onDragstart: (event: DragEvent) => onDragstart(event, treeNode.value),
        onDrop: (event: DragEvent) => onDrop(event, treeNode.value),
        onDragend: (event: DragEvent) => {
          console.log('a', onDragend)
          onDragend(event)
        }
      }
      return (
        <div
          class="s-tree-node hover:bg-slate-300 relative "
          style={{
            paddingLeft: `${NODE_INDENT * (treeNode.value.level - 1)}px`,
            height: `${NODE_HEIGHT}px`
          }}
          // 控制操作按钮显示
          onMouseenter={toggleOperate}
          onMouseleave={toggleOperate}
        >
          {/* 连接线 */}
          {!treeNode.value.isLeaf && treeNode.value.expended && (
            <span
              class="s-tree-node__vline absolute w-px bg-slate-300"
              style={{
                width: '1px',
                height: `${
                  NODE_HEIGHT * getExpandedChildren(treeNode.value).length
                }px`,
                left: `${NODE_INDENT * (treeNode.value.level - 1) + 12}px`,
                top: `${NODE_HEIGHT}px`
              }}
            ></span>
          )}

          <div class="s-tree__node--content" {...dragdrop}>
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
            {/* 节点内容 */}
            {slots.content && slots.content()}
            {/* 操作节点 */}
            {operable.value && isShow.value && (
              <span class="inline-flex ml-1">
                <svg
                  onClick={() => {
                    append(treeNode.value, '新节点')
                  }}
                  viewBox="0 0 1024 1024"
                  width="14"
                  height="14"
                  class="cursor-pointer"
                >
                  <path d="M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z"></path>
                </svg>
                <svg
                  onClick={() => {
                    remove(treeNode.value)
                  }}
                  viewBox="0 0 1024 1024"
                  width="14"
                  height="14"
                  class="cursor-pointer ml-1"
                >
                  <path d="M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z"></path>
                </svg>
              </span>
            )}
            {treeNode.value.loading && slots.loading?.()}
          </div>
        </div>
      )
    }
  }
})
