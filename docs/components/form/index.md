# 表单

## 基础用法

:::demo 传入 model

```vue
<template>
  <d-form :model="model" layout="vertical">
    <d-form-item label="姓名:">
      <input type="text" />
    </d-form-item>
  </d-form>
</template>
<script setup>
import { reactive } from 'vue'
const model = reactive({
  user: 'tom'
})
</script>
```

:::
