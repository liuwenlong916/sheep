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
    const onInput = (event: Event) => {
      const val = (event.target as HTMLInputElement).value
      if (props.from === 'formItem') {
        const formItem = inject('formItemContext') as ItemContext
        formItem && formItem.validator()
      }
      emit('input', val)
      emit('update:modelValue', val)
    }
    const onBlur = (e: Event) => {
      console.log('blur', e)
    }
    expose({ input })
    return () => {
      return (
        <div class="s-input">
          <input
            style="appearance: none;"
            ref={input}
            value={modelValue.value}
            {...props}
            onInput={onInput}
            type={props.type}
            onBlur={onBlur}
          ></input>
        </div>
      )
    }
  }
})
