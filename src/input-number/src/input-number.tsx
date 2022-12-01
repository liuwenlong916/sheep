import { defineComponent, toRefs, ref, computed } from 'vue'
import { InputNumberProps, inputNumberProps } from './input-number-type'
import { DInput } from '../../input'
import '../style/input-number.scss'
import useInputNumber from './use-input-number'
export default defineComponent({
  name: 'DInputNumber',
  props: inputNumberProps,
  // emits: ['update:modelValue', 'input'],
  setup(props: InputNumberProps, { emit }) {
    const { max, min, modelValue, controls, step } = toRefs(props)
    const { currentValue, displayValue, currPrecision, setCurrentValue } =
      useInputNumber(props)

    const baseInput = ref()

    const onInput = (val: string) => {
      // const input = event.target as HTMLInputElement
      // const val = input.value

      currentValue.value = setCurrentValue(val)
      const input = baseInput.value?.input as HTMLInputElement
      input.value = currentValue.value.toString()
      emit('input', displayValue.value)
      emit('update:modelValue', displayValue.value)
    }
    const onBlur = () => {
      console.log('onBlur', displayValue.value)
      const input = baseInput.value?.input as HTMLInputElement
      input.value = displayValue.value
      emit('input', displayValue.value)
      emit('update:modelValue', displayValue.value)
    }
    const addCurrValue = () => {
      if (currentValue.value >= max.value) {
        return
      }
      // currentValue.value =
      //   (currentValue.value * precisionFactor.value +
      //     step.value * precisionFactor.value) /
      //   precisionFactor.value
      currentValue.value = parseFloat(
        (currentValue.value + step.value).toFixed(currPrecision.value)
      )
      console.log()
      emit('update:modelValue', displayValue.value)
    }
    const prepCurrValue = () => {
      if (currentValue.value <= min.value) {
        return
      }
      currentValue.value = parseFloat(
        (currentValue.value - step.value).toFixed(currPrecision.value)
      )
      emit('update:modelValue', displayValue.value)
    }

    return () => {
      return (
        // <input
        //   type="number"
        //   value={currentValue.value}
        //   onInput={onInput}
        // ></input>
        <div class="s-input-number">
          {controls.value && (
            <div>
              <span
                role="button"
                onClick={() => prepCurrValue()}
                class={
                  modelValue.value <= min.value
                    ? 'is_disabled s-input-number__decrease'
                    : 's-input-number__decrease'
                }
              >
                -
              </span>

              <span
                role="button"
                onClick={() => addCurrValue()}
                class={
                  modelValue.value >= max.value
                    ? 'is_disabled s-input-number__increase'
                    : 's-input-number__increase'
                }
              >
                +
              </span>
            </div>
          )}
          <DInput
            ref={baseInput}
            type="number"
            from="number"
            max={max.value}
            min={min.value}
            modelValue={displayValue.value.toString()}
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
