import { Ref } from 'vue'

export type IPaginationType = {
  currIndex: Ref<number>
  prevPage: () => void
  nextPage: () => void
  jumpPage: (index: number) => void
  setPageIndex: (index: number) => void
  getCenterPage: (
    totalPage: number,
    pageIndex: number,
    pagerCount: number
  ) => Array<number>
  getHalfPagerSize: (pagerSize: number) => number
}
