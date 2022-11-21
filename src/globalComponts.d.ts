/**全局组件引入，props提示信息：直接引入类型
属性名为组件名
import { buttonProps, ButtonProps, IButtonType } from './button/src/button-type'
方式1
LButton: ButtonProps
方式2：
LButton: typeof buttonProps
方式3：
import LButton from './button/src/button'
LButton: typeof LButton
方式4：
import { Button } from './button/index'
LButton: typeof Button
方式5：
LButton: typeof import('./button/index')['Button']
 */

import { DButton } from './button/index'
import { DForm } from './form/index'

declare module 'vue' {
  export interface GlobalComponents {
    DButton: typeof DButton
    DForm: typeof DForm
    // RouterLink: typeof import('vue-router')['RouterLink']
    // RouterView: typeof import('vue-router')['RouterView']
  }
}
export {}
