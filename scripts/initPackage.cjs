const fsExtra = require('fs-extra')
const path = require('path')

// 创建时传入包名name
const createPackageJson = (outputDir, name) => {
  // 根据传入name决定包名、主文件和主模块名称
  const fileStr = `{
    "name": "${name ? name : 'db-sheep-ui'}",
    "version": "0.0.4",
    "main": "${name ? 'index.umd.cjs' : 'db-sheep-ui.umd.cjs'}",
    "module": "${name ? 'index.js' : 'db-sheep-ui.js'}",
    "author": "liuwenlong916",
    "github": "",
    "description": "vue3 tsx 组件库",
    "repository": {
      "type": "git",
      "url": "git+https://github.com/liuwenlong916/sheep.git"
    },
    "keywords": ["vue3", "组件库", "tsx", "UI"],
    "license": "ISC",
    "bugs": {
      "url": "https://github.com/liuwenlong916/sheep/issues"
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
module.exports.createPackageJson = createPackageJson
