/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// import sheepUI from 'db-sheep-ui'
declare module 'db-sheep-ui' {
  const demoblock: any
  export default demoblock
}
