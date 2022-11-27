import { defineComponent, toRef, toRefs } from 'vue'
import { ModalProps, modalProps } from './modal-type'
import '../style/modal.scss'
export default defineComponent({
  name: 'DModal',
  props: modalProps,
  emits: ['update:modelValue'],
  setup(props: ModalProps, { slots, emit }) {
    const { modelValue } = toRefs(props)
    return () => {
      return (
        <div>
          {modelValue.value && (
            <div class="s-modal">
              <div
                class="s-modal__mask"
                onClick={() => emit('update:modelValue', false)}
              ></div>
              {slots.default?.()}
            </div>
          )}
        </div>
      )
    }
  }
})
