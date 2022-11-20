# 分页

:::demo 基础功能

```vue
<template>
  <d-pagination :total="100" :pagerSize="5"></d-pagination>
</template>
```

:::

# 分页 pager

:::demo 基础功能

```vue
<template>
  <d-pager :total="100" :pagerSize="3"></d-pager>
</template>
```

:::

# 分页 model

:::demo 基础功能

```vue
<template>
  <d-pager :total="100" :pagerSize="3" v-model="pageIndex"></d-pager>
  {{ double }}
</template>
<script setup>
import { ref, computed } from 'vue'
const pageIndex = ref(1)
const double = computed(() => pageIndex.value * 2)
</script>
```

:::

# 分页 model

:::demo 基础功能

```vue
<template>
  <d-pagination :total="100" :pagerSize="3" v-model="pageIndex"></d-pagination>
  {{ double }}
</template>
<script setup>
import { ref, computed } from 'vue'
const pageIndex = ref(1)
const double = computed(() => pageIndex.value * 2)
</script>
```

:::
