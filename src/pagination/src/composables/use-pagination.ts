import { ref } from 'vue'
import { IPaginationType } from './use-pagination-type'

export default function usePaginatin(
  totalPage: number,
  defaultIndex = 1
): IPaginationType {
  const currIndex = ref(defaultIndex)

  const setPageIndex = (index: number) => {
    if (totalPage < index) {
      currIndex.value = totalPage
    } else if (index < 1) {
      currIndex.value = 1
    } else {
      currIndex.value = index
    }
  }
  const jumpPage = (index: number) => {
    console.log(index)
    if (index + currIndex.value > totalPage) {
      currIndex.value = totalPage
    } else if (currIndex.value + index < 1) {
      currIndex.value = 1
    } else {
      currIndex.value += index
    }
  }

  const prevPage = () => jumpPage(-1)
  const nextPage = () => jumpPage(1)

  const getCenterPage = (
    totalPage: number,
    pageIndex: number,
    pagerCount: number
  ) => {
    // [0,1,2,3,4,5,6,7,8,9]
    const totalPageArr = Array.from(Array(totalPage).keys())

    if (totalPage <= pagerCount) {
      // [0,1,2,3,4]
      // 页面太少，全部显示
      // [2,3,4]
      return totalPageArr.slice(2, totalPage)
    } else {
      // 计算中位数
      const middle = Math.ceil(pagerCount / 2)
      // [2,3,4,5,6] index =1234
      if (pageIndex <= middle) {
        // 左边全显示
        return totalPageArr.slice(2, pagerCount + 1)
      } else if (pageIndex >= totalPage - middle + 1) {
        // pageIndex=6
        // 右边全显示
        return totalPageArr.slice(totalPage - pagerCount + 1, totalPage)
      } else {
        // pageIndex=4
        // [2,3,4,5,6]
        // 中间显示
        return totalPageArr.slice(
          pageIndex - middle + 1, // 5 -2 = 3
          pageIndex + middle // 5 + 2
        )
      }
    }
  }

  const getHalfPagerSize = (pagerSize: number) => {
    if (pagerSize % 2 === 0) {
      return pagerSize / 2
    } else {
      return (pagerSize - 1) / 2
    }
  }

  return {
    currIndex,
    prevPage,
    nextPage,
    jumpPage,
    setPageIndex,
    getCenterPage,
    getHalfPagerSize
  }
}
