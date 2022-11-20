import { computed, defineComponent, onMounted, toRefs, watch } from 'vue'
import usePaginatin from '../composables/use-pagination'
import { PagerProps, pagerProps } from './pager-type'

export default defineComponent({
  name: 'DPager',
  emits: ['update:modelValue'],
  props: pagerProps,
  setup(props: PagerProps, { expose, emit }) {
    const { total, pageSize, pagerSize, modelValue } = toRefs(props)
    const totalPage = computed(() => Math.ceil(total.value / pageSize.value))
    const {
      currIndex,
      getCenterPage,
      setPageIndex,
      jumpPage,
      prevPage,
      nextPage,
      getHalfPagerSize
    } = usePaginatin(totalPage.value)
    const halfPagerSize = getHalfPagerSize(pagerSize.value)
    const pagers = computed(() =>
      getCenterPage(totalPage.value, currIndex.value, pagerSize.value)
    )
    //向外暴露
    expose({ prevPage, nextPage, setPageIndex, currIndex })

    onMounted(() => {
      watch(
        () => modelValue.value,
        (newval: number) => {
          currIndex.value = newval
        }
      ),
        watch(
          () => currIndex.value,
          newval => {
            emit('update:modelValue', newval)
          }
        )
    })
    return () => {
      return (
        <ul class="s-pager">
          <li
            onClick={() => setPageIndex(1)}
            class={{ current: currIndex.value == 1 }}
          >
            1
          </li>
          {/* 1 ... 34567 ... 9 */}
          {currIndex.value - halfPagerSize > 2 && (
            <li onClick={() => jumpPage(-5)}>...</li>
          )}

          {pagers.value.map(item => (
            <li
              onClick={() => setPageIndex(item)}
              class={{ current: item === currIndex.value }}
            >
              {item}
            </li>
          ))}
          {currIndex.value + halfPagerSize + 1 < totalPage.value && (
            <li onClick={() => jumpPage(5)}>...</li>
          )}
          {totalPage.value > 1 && (
            <li
              onClick={() => setPageIndex(totalPage.value)}
              class={{ current: totalPage.value == currIndex.value }}
            >
              {totalPage.value}
            </li>
          )}
        </ul>
      )
    }
  }
})
