import { P } from './p.js'
// const P = require('./p')
// let x = new P(add => {
//   console.log('t', this)
//   add()
// })
let x = new P(function (add) {
  console.log('t', this, add)
  add()
})
x.add()
