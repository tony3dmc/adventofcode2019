const rules = [
  str => {
    return /(.)\1/.test(str)
  },
  str => {
    let last = 0
    for (let i = 0; i < str.length; i++) {
      let current = parseInt(str.charAt(i))
      if (current < last) {
        return false
      }
      last = current
    }
    return true
  },
  str => str.match(/(.)\1+/g).filter(s => s.length == 2).length
]

const testCode = code => {
  code = code.toString()
  for (rule of rules) {
    if (!rule(code)) {
      return false
    }
  }
  return true
}

const findPossibleCodes = (min, max) => {
  const codes = []
  for (let i = min; i <= max; i++) {
    if (testCode(i)) {
      codes.push(i)
    }

  }
  return codes
}

[ 112233, 123444, 111122 ].forEach(code => {
  console.log(`Code ${code} is a ${testCode(code) ? 'GOOD' : 'BAD'} code`)
})

const [ min, max ] = require('fs').readFileSync('input.txt')
                                  .toString()
                                  .trim()
                                  .split('-')

console.log(`Number of possible codes is ${findPossibleCodes(min, max).length}`)

