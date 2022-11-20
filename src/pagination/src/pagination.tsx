import { defineComponent, ref, toRefs, onMounted, watch } from 'vue'
import { PaginationProps, paginationProps } from './pagination-type'
import '../style/pagination.scss'
import DPager from './components/pager'
export default defineComponent({
  name: 'DPagination',
  emits: ['update:modelValue'],
  props: paginationProps,
  setup(props: PaginationProps, { emit }) {
    const pager = ref() //vue2 中的$refs
    const { modelValue } = toRefs(props)
    onMounted(() => {
      //实现跳转页更新数据
      watch(
        () => modelValue.value,
        (newval: number) => {
          pager.value.setPageIndex(newval)
        }
      )
      watch(
        () => pager.value.currIndex,
        (newVal: number) => {
          emit('update:modelValue', newVal)
        }
      )
    })
    // const { nextPage, prevPage } = pager.value
    return () => {
      return (
        <div class="s-pagination">
          <button onClick={() => pager.value.prevPage()}>上一页</button>
          <DPager {...props} ref={pager}></DPager>
          <button onClick={() => pager.value.nextPage()}>下一页</button>
        </div>
      )
    }
  }
})
