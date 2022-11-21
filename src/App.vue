<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import TestJSX from './components/TestJSX'
// import { Button } from './button/index'
const confirm = function () {
  console.log('confirm')
}
</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
  <TestJSX></TestJSX>
  <D-button type="primary" size="small">确定</D-button>
  <D-button type="primary" size="medium" @click="confirm" :disabled="true">
    确定
  </D-button>
  <!-- <Button type="primary">局部引入</Button> -->
  <D-button block>取消</D-button>
  <d-form :model="{}" layout="vertical"></d-form>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
