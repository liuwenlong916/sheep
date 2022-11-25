import { Values } from 'async-validator'
import { defineComponent, toRefs, provide, computed } from 'vue'
import { ItemContext } from './form-item-type'
import { formContextToken, FormProps, formProps } from './form-type'
export default defineComponent({
  name: 'DForm',
  props: formProps,
  emit: ['submit'], //对外暴露提交方法
  setup(props: FormProps, { slots, emit, expose }) {
    const { model, layout, rules } = toRefs(props)
    const label_data = computed(() => ({
      layout: layout.value
    }))
    provide('LABEL_DATA', label_data)

    const formItems = new Set<ItemContext>()
    const addItem = (item: ItemContext) => formItems.add(item)
    const removeItem = (item: ItemContext) => formItems.delete(item)
    provide(formContextToken, {
      model: props.model,
      rules: props.rules,
      addItem,
      removeItem
    })
    console.log(rules?.value)

    // 暴露两种校验方式，
    // 1.定义submit
    // 2.调用valadite
    const onSubmit = (e: Event) => {
      e.preventDefault() //阻止默认事件
      emit('submit')
    }
    const validate = (callback: (valid: boolean) => void) => {
      const tasks: Array<Promise<Values>> = []
      formItems.forEach(item => tasks.push(item.validator()))
      Promise.all(tasks).then(
        () => callback(true),
        () => callback(false)
      )
      // .catch(() => callback(false))
    }
    //对外暴露校验方法
    expose({ validate })
    return () => {
      return <form onSubmit={onSubmit}>{slots.default?.()}</form>
    }
  }
})
