import { computed, defineComponent, inject, toRefs, watch, ref } from 'vue'
import { ItemContext } from '../../form/src/form-item-type'
import { InputProps, inputProps } from './input-type'

export default defineComponent({
  name: 'DInput',
  props: inputProps,
  emits: ['update:modelValue', 'input', 'blur'], //对外暴露一个事件，
  setup(props: InputProps, { emit, expose }) {
    const { modelValue, from } = toRefs(props)
    const val = ref(modelValue.value)
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
    const updateValue = (value: string) => {
      //TODO: 临时解决输入非数字时， 触发更新事件
      val.value = ''
      val.value = value
    }

    expose({ updateValue })
    return () => {
      return (
        <div>
          <input
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
