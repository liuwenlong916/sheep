import { defineComponent, inject } from 'vue'
import { ItemContext } from '../../form/src/form-item-type'
import { InputProps, inputProps } from './input-type'
export default defineComponent({
  name: 'DInput',
  props: inputProps,
  emit: ['update:modelValue'],
  setup(props: InputProps, { emit }) {
    const formItem = inject('formItemContext') as ItemContext
    const onInput = (event: Event) => {
      const val = (event.target as HTMLInputElement).value
      emit('update:modelValue', val)
      formItem.validator()
    }
    return () => {
      return (
        <input
          value={props.modelValue}
          onInput={onInput}
          type={props.type}
        ></input>
      )
    }
  }
})
