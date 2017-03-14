// log256(x) = log10(x) / log10(256)
//

function getBaseLog (x, y) {
  return Math.log(y) / Math.log(x)
}

const n = 1000

console.log(Math.ceil(getBaseLog(256, n)))
