# input

:::demo input-number

```vue
<template>
  <d-input v-model="val"></d-input>
  <d-input v-model="val"></d-input>
  {{ val }}
</template>
<script setup>
import { ref, watch } from 'vue'
const val = ref(2)
</script>
```

:::

# input-number

:::demo input-number

```vue
<template>
  <d-input-number v-model="val" :max="10"></d-input-number>
  {{ val }}
</template>
<script setup>
import { ref, watch } from 'vue'
const val = ref(2)
</script>
```

:::
