import { defineComponent, toRefs, ref } from 'vue'
import { InputNumberProps, inputNumberProps } from './input-number-type'
import { DInput } from '../../input'
import '../style/input-number.scss'
export default defineComponent({
  name: 'DInputNumber',
  props: inputNumberProps,
  // emits: ['update:modelValue', 'input'],
  setup(props: InputNumberProps, { emit }) {
    const { max, min, modelValue } = toRefs(props)
    const currentValue = ref<number>(modelValue.value)

    const baseInput = ref()
    const setCurrentValue = (value: string) => {
      const old = currentValue.value
      const newVal = Number(value)
      if (Number.isNaN(newVal)) {
        return old
      }
      if (newVal > max.value) return max.value
      if (newVal < min.value) return min.value
      return newVal
    }
    const onInput = (value: string) => {
      currentValue.value = setCurrentValue(value)
      emit('input', currentValue.value)
      emit('update:modelValue', currentValue.value)
      baseInput.value &&
        baseInput.value.updateValue(currentValue.value.toString())
    }
    const onBlur = () => {
      console.log('f')
    }
    // const displayValue = computed(() => {
    //   return currentValue.value
    // })
    return () => {
      return (
        <DInput
          ref={baseInput}
          from="number"
          modelValue={currentValue.value.toString()}
          onUpdate:modelValue={() => {
            emit('update:modelValue', currentValue.value)
          }}
          onBlur={onBlur}
          onInput={onInput}
        ></DInput>
      )
    }
  }
})
