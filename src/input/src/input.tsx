import { computed, defineComponent, inject, toRefs, watch, ref } from 'vue'
import { ItemContext } from '../../form/src/form-item-type'
import { InputProps, inputProps } from './input-type'
import '../style/input.scss'

export default defineComponent({
  name: 'DInput',
  props: inputProps,
  emits: ['update:modelValue', 'input', 'blur'], //对外暴露一个事件，
  setup(props: InputProps, { emit, expose }) {
    const { modelValue } = toRefs(props)
    const input = ref()
    const inputValue = ref()
    const onInput = (event: Event) => {
      inputValue.value = (event.target as HTMLInputElement).value
      if (props.from === 'formItem') {
        const formItem = inject('formItemContext') as ItemContext
        formItem && formItem.validator()
      }
      emit('input', inputValue.value)

      emit('update:modelValue', inputValue.value)
    }
    const onBlur = (e: Event) => {
      console.log('blur', e)
      emit('blur')
    }
    const val = computed(() => {
      return modelValue.value
    })
    expose({ input })
    return () => {
      return (
        <div class="s-input">
          <input
            ref={input}
            value={val.value}
            onInput={onInput}
            type={props.type}
            onBlur={onBlur}
          ></input>
        </div>
      )
    }
  }
})
