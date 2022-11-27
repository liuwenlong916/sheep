# modal

:::demo modal 模态框

```vue
<template>
  <d-button @click="open">打开</d-button>
  <d-modal v-model="visable">
    <div>测试内容</div>
  </d-modal>
</template>

<script setup>
import { ref } from 'vue'
const visable = ref(false)
const open = () => {
  visable.value = true
}
</script>
```

:::

:::demo dialog

```vue
<template>
  <d-button @click="open">打开</d-button>
  <d-dialog v-model="visable" :title="title">
    <div>body</div>
    <template #footer> <d-button @click="close">取消</d-button></template>
  </d-dialog>
</template>
<script setup>
import { ref } from 'vue'
const visable = ref(false)
const title = ref('标题')

const open = () => {
  visable.value = true
}
const close = () => {
  visable.value = false
}
</script>
```

:::
