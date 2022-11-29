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
    const onInput = (val: string) => {
      // const input = event.target as HTMLInputElement
      // const val = input.value

      currentValue.value = setCurrentValue(val)
      const input = baseInput.value?.input as HTMLInputElement
      console.log(baseInput.value)
      input.value = currentValue.value.toString()
      emit('input', currentValue.value)
      emit('update:modelValue', currentValue.value)
    }
    const onBlur = () => {
      console.log('onBlur')
    }
    return () => {
      return (
        // <input
        //   type="number"
        //   value={currentValue.value}
        //   onInput={onInput}
        // ></input>
        <div class="s-input-number">
          <DInput
            ref={baseInput}
            type="number"
            from="number"
            max={max.value}
            min={min.value}
            modelValue={currentValue.value.toString()}
            onUpdate:modelValue={() => {
              emit('update:modelValue', currentValue.value)
            }}
            onBlur={onBlur}
            onInput={onInput}
          ></DInput>
        </div>
      )
    }
  }
})
