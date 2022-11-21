import { defineComponent, ref, toRefs, onMounted, watch, computed } from 'vue'
import { PaginationProps, paginationProps } from './pagination-type'
import '../style/pagination.scss'
import DPager from './components/pager'
export default defineComponent({
  name: 'DPagination',
  emits: ['update:modelValue'],
  props: paginationProps,
  setup(props: PaginationProps, { emit }) {
    //挂载完成后才会有值
    //vue2 中的$refs
    const pager = ref()
    console.log('p', pager.value)
    const { modelValue } = toRefs(props)
    const disablePrev = computed(() =>
      pager.value ? pager.value.currIndex == 1 : true
    )
    const disableNext = computed(() =>
      pager.value ? pager.value.currIndex == pager.value.totalPage : true
    )
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
          <button
            onClick={() => pager.value.prevPage()}
            disabled={disablePrev.value}
            class={{ notAllow: disablePrev.value }}
          >
            {'<'}
          </button>
          <DPager {...props} ref={pager}></DPager>
          <button
            onClick={() => pager.value.nextPage()}
            disabled={disableNext.value}
            class={{ notAllow: disableNext.value }}
          >
            {'>'}
          </button>
        </div>
      )
    }
  }
})
