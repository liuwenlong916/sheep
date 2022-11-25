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

## 表单校验

:::demo

```vue
<template>
  <d-form
    ref="form"
    :model="model"
    :rules="rules"
    layout="vertical"
    @submit="onLogin"
  >
    <d-form-item label="用户名：" field="user">
      <d-input v-model="model.user" />
    </d-form-item>
    <d-form-item label="密码：" field="user">
      <d-input type="password" v-model="model.pwd" />
    </d-form-item>
    <d-form-item>
      <button>提交</button>
      <!-- <d-button onClick="clickHandle">提交</d-button> -->
    </d-form-item>
    <d-form-item>
      <d-button @click="clickHandle">提交</d-button>
    </d-form-item>
  </d-form>
  {{ model }}
</template>
<script setup>
import { ref } from 'vue'
const form = ref(null)
const model = ref({
  user: '',
  pwd: ''
})
const rules = ref({
  user: [{ required: true, message: '用户名为必填项' }],
  pwd: [{ required: true, message: '密码为必填项' }]
})
const onLogin = () => {
  form.value.validate(valid => {
    console.log(valid)
  })
}
const clickHandle = () => {
  form.value.validate(valid => {
    console.log(valid)
  })
}
</script>
```

:::
