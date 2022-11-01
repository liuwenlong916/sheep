import { defineComponent, toRefs } from 'vue'
import { TreeProps, treeProps } from './tree-type'
export default defineComponent({
  name: 'DTree',
  props: treeProps,
  setup(props: TreeProps) {
    return () => {
      return <div class="s-tree"></div>
    }
  }
})
