import {
  defineComponent,
  ref,
  inject,
  ComputedRef,
  provide,
  onUnmounted,
  onMounted
} from 'vue'
import { FormItemProps, formItemProps, LabelData } from './form-item-type'
import '../style/form-type.scss'
import { formContextToken, FormContext } from './form-type'
import Validator from 'async-validator'
export default defineComponent({
  name: 'DForm',
  props: formItemProps,
  setup(props: FormItemProps, { slots }) {
    const showError = ref(false)
    const errorMsg = ref('')
    const label_data = inject('LABEL_DATA') as ComputedRef<LabelData>
    const formContext = inject(formContextToken) as FormContext
    const itemClasses = {
      's-form__item': true,
      's-form__item--vertical': label_data.value.layout === 'vertical',
      's-form__item--horizontal': label_data.value.layout === 'horizontal'
    }
    // const { field } = toRefs(props)

    const validator = () => {
      if (!formContext) {
        console.warn('请在form中使用')
        return Promise.reject('请在form中使用')
      }
      if (!props.field) {
        console.warn('请在设置field进行校验')
        return Promise.reject('请在设置field进行校验')
      }
      if (!formContext.rules) {
        return Promise.resolve('不需要校验')
      }

      const itemRule = formContext.rules[props.field]
      if (!itemRule) {
        return Promise.resolve('不需要校验')
      }
      const itemValue = formContext.model[props.field]
      const validator = new Validator({ [props.field]: itemRule })
      return validator.validate({ [props.field]: itemValue }, error => {
        if (error) {
          showError.value = true
          errorMsg.value = error[0].message || '校验失败'
        } else {
          showError.value = false
          errorMsg.value = ''
        }
      })
    }
    const itemContext = {
      validator
    }
    provide('formItemContext', itemContext)
    onMounted(() => {
      if (props.field) {
        formContext?.addItem(itemContext)
      }
    })
    onUnmounted(() => {
      if (props.field) {
        formContext?.removeItem(itemContext)
      }
    })
    return () => {
      return (
        <div>
          <div class={itemClasses}>
            {/* label */}
            <span>{props.label}</span>
            {/* control */}
            {slots.default?.()}
          </div>
          {showError.value && <span style="color:red">{errorMsg.value}</span>}
        </div>
      )
    }
  }
})
