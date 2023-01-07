export class P {
  constructor(f) {
    // f.call(this, this.add)
    f(this.add)
    P.add = this.add.bind(this)
  }
  add() {
    console.log(this)
  }
}
