import { defineComponent, toRefs } from 'vue'
import useTree from './composables/use-tree'
import { TreeProps, treeProps } from './tree-type'
export default defineComponent({
  name: 'DTree',
  props: treeProps,
  setup(props: TreeProps) {
    const { data } = toRefs(props)
    const { expandTree, toggleNode } = useTree(data)

    return () => {
      return (
        <div class="s-tree">
          {expandTree.value.map(treeNode => (
            <div
              class="s-tree-node"
              style={{
                paddingLeft: `${24 * (treeNode.level - 1)}px`
              }}
            >
              {treeNode.isLeaf ? (
                <span style="width:25px; display:inline-block"></span>
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
              {treeNode.label}
            </div>
          ))}
        </div>
      )
    }
  }
})
