import { defineComponent, toRefs, watch } from 'vue'
import { DialogProps, dialogProps } from './dialog-type'
import '../style/dialog.scss'
import { DModal } from '../../modal/index'
export default defineComponent({
  name: 'DDialog',
  props: dialogProps,
  emits: ['update:modelValue'],
  //TODO: beforeClose
  setup(props: DialogProps, { slots, emit }) {
    return () => {
      const { modelValue, title, showClose } = toRefs(props)
      watch(
        (): Boolean => modelValue.value,
        (newValue, oldValue) => {
          console.log('watch', newValue, oldValue)
        }
      )
      return (
        <DModal
          modelValue={modelValue.value}
          onUpdate:modelValue={value => {
            emit('update:modelValue', value)
          }}
        >
          <div class="s-dialog__container">
            {' '}
            {/* head */}
            {slots.head ? (
              slots.head()
            ) : (
              <div class="s-dialog__header">
                {title.value}
                {/* 增加关闭按钮 */}
                {showClose.value && (
                  <svg
                    onClick={() => {
                      emit('update:modelValue', false)
                    }}
                    class="s-dialog__close"
                    viewBox="0 0 1024 1024"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                    ></path>
                  </svg>
                )}
              </div>
            )}
            {/* context */}
            <div class="s-dialog__body">{slots.default?.()}</div>
            {/* footer */}
            <div class="s-dialog__footer">{slots.footer?.()}</div>
          </div>
        </DModal>
      )
    }
  }
})
