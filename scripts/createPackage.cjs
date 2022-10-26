const fsExtra = require('fs-extra')
const path = require('path')

// 创建时传入包名name
const createPackageJson = (outputDir, name) => {
  // 根据传入name决定包名、主文件和主模块名称
  const fileStr = `{
    "name": "sheep-ui",
    "version": "0.0.0",
    "main": "sheep-ui.umd.cjs",
    "module": "sheep-ui.js",
    "author": "杨村长",
    "github": "",
    "description": "羊村第一个组件库Sheep-UI，以后村里羊圈能不能建好就看它了！",
    "repository": {
      "type": "git",
      "url": "git+https://github.com/57code/sheep-ui.git"
    },
    "keywords": ["vue3", "组件库", "tsx", "UI"],
    "license": "ISC",
    "bugs": {
      "url": "https://github.com/57code/sheep-ui/issues"
    }
  }`
  // 存在包名称，给单组件生成package.json文件
  if (name) {
    fsExtra.outputFile(
      path.resolve(outputDir, `${name}/package.json`),
      fileStr,
      'utf-8'
    )
  } else {
    fsExtra.outputFile(
      path.resolve(outputDir, 'package.json'),
      fileStr,
      'utf-8'
    )
  }
}
module.exports = createPackageJson
