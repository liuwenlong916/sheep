import { defineComponent, toRefs, provide, computed } from 'vue'
import { FormProps, formProps } from './form-type'
export default defineComponent({
  name: 'DForm',
  props: formProps,
  setup(props: FormProps, { slots }) {
    const { model, layout } = toRefs(props)
    console.log(model.value)
    const label_data = computed(() => ({
      layout: layout.value
    }))
    provide('LABEL_DATA', label_data)
    return () => {
      return <div class="s-form">{slots.default?.()}</div>
    }
  }
})
