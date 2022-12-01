import { Ref, ComputedRef } from 'vue'

export interface IInputNumber {
  currentValue: Ref<number>
  displayValue: ComputedRef<string>
  currPrecision: ComputedRef<number>
  precisionFactor: ComputedRef<number>
  setCurrentValue: (value: string) => number
}
