import { ref, computed } from 'vue'
import { InputNumberProps } from './input-number-type'

export default function useInputNumber(props: InputNumberProps) {
  const currPrecision = computed(() => {
    const temp = getPrecision(props.step)
    return temp > props.precision ? temp : props.precision
  })
  const precisionFactor = computed(() => Math.pow(10, currPrecision.value))
  const currentValue = ref<number>(parseFloat(props.modelValue.toString()))
  const displayValue = computed(() => {
    return currentValue.value.toFixed(currPrecision.value)
  })
  const getPrecision = (value: number) => {
    if (value === undefined) return 0
    const valueString = value.toString()
    const dotPosition = valueString.indexOf('.')
    let precision = 0
    if (dotPosition !== -1) {
      precision = valueString.length - dotPosition - 1
    }
    return precision
  }
  const setCurrentValue = (value: string) => {
    const old = currentValue.value
    const newVal = Number(value)
    if (Number.isNaN(newVal)) {
      return old
    }
    if (newVal > props.max) return props.max
    if (newVal < props.min) return props.min
    return newVal
  }
  return {
    currentValue,
    displayValue,
    currPrecision,
    precisionFactor,
    setCurrentValue
  }
}
