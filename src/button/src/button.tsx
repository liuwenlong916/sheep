import { defineComponent, toRefs } from 'vue'
import { ButtonProps, buttonProps } from './button-type'

export default defineComponent({
  name: 'DButton',
  props: buttonProps,
  emit: ['click'],
  setup(props: ButtonProps, { slots, emit }) {
    const { type, size, disabled, block } = toRefs(props)
    const blockCls = block.value ? 's-btn-block' : ''
    return () => {
      const click = (e: Event) => {
        e.preventDefault()
        emit('click')
      }
      return (
        <button
          onClick={click}
          disabled={disabled.value}
          class={`s-btn s-btn--${type.value} s-btn--${size.value} ${blockCls}`}
        >
          {slots.default ? slots.default() : '按钮'}
        </button>
      )
    }
  }
})
