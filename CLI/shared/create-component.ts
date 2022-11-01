import { ensureDirSync, writeFileSync } from 'fs-extra'
import { resolve } from 'path'

import { lightBlue, lightGreen } from 'kolorist'
import { genCoreTemplate } from '../template/core'
import { genTypeTemplate } from '../template/types'
import { genIndexTemplate } from '../template/index'
import { genStyleTemplate } from '../template/style'
import genTestTemplate from '../template/test'
import { WriteFileOptions } from 'fs'

export interface ComponentMeta {
  name: string
  title: string
  category: string
}

export function createComponent(meta: ComponentMeta) {
  const { name } = meta
  //拼接目录

  const componentDir = resolve('../src', name)

  //组件源文件、类型、样式、测试

  const compSrcDir = resolve(componentDir, 'src')
  const styleDir = resolve(componentDir, 'style')
  const testDir = resolve(componentDir, 'test')
  ensureDirSync(compSrcDir)
  ensureDirSync(styleDir)
  ensureDirSync(testDir)
  //内容创建
  const WRITE_FILE_OPTIONS: WriteFileOptions = { encoding: 'utf-8' }
  const coreFilePath = resolve(compSrcDir, `${name}.tsx`)
  writeFileSync(coreFilePath, genCoreTemplate(name), WRITE_FILE_OPTIONS)

  const typeFilePath = resolve(compSrcDir, `${name}-type.ts`)
  writeFileSync(typeFilePath, genTypeTemplate(name), WRITE_FILE_OPTIONS)

  const indexFilePath = resolve(componentDir, `index.ts`)
  writeFileSync(indexFilePath, genIndexTemplate(name), WRITE_FILE_OPTIONS)
  // 核心文件：组件样式文件
  // 样式文件
  const styleFilePath = resolve(styleDir, `${name}.scss`)
  console.log(styleFilePath)
  writeFileSync(styleFilePath, genStyleTemplate(name), WRITE_FILE_OPTIONS)

  // 核心文件：测试文件
  const testFilePath = resolve(testDir, `${name}.test.ts`)
  writeFileSync(testFilePath, genTestTemplate(name), WRITE_FILE_OPTIONS)
  //通知
  console.log(
    lightGreen(`
    ✔ 组件${name}目录创建成功
  `)
  )
  console.log(
    lightBlue(`
    ✔ 组件目录：${componentDir}
  `)
  )
}
