export function randonId(length = 8): string {
  let res = ''
  const STR = 'abcdefghijklmnopqrstuvwxyz0123456789' // 可以作为常量放到random外面
  for (let i = 0; i < length; i++) {
    res += STR[parseInt((Math.random() * STR.length).toString())]
  }
  return res
}
