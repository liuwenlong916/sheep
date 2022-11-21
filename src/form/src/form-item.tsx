import { defineComponent, inject, ComputedRef } from 'vue'
import { FormItemProps, formItemProps, LabelData } from './form-item-type'
import '../style/form-type.scss'
export default defineComponent({
  name: 'DForm',
  props: formItemProps,
  setup(props: FormItemProps, { slots }) {
    const label_data = inject('LABEL_DATA') as ComputedRef<LabelData>

    const itemClasses = {
      's-form__item': true,
      's-form__item--vertical': label_data.value.layout === 'vertical',
      's-form__item--horizontal': label_data.value.layout === 'horizontal'
    }
    return () => {
      return (
        <div class={itemClasses}>
          {/* label */}
          <span>{props.label}</span>
          {/* control */}
          {slots.default?.()}
        </div>
      )
    }
  }
})
