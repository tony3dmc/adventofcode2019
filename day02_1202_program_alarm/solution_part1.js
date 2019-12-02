const intcode = (codes) => {
  for (let i = 0; i < codes.length; i++) {
    switch (codes[i]) {
      case 1:
        codes[codes[i+3]] = codes[codes[i+1]] + codes[codes[i+2]]
        i += 3
        break
      case 2:
        codes[codes[i+3]] = codes[codes[i+1]] * codes[codes[i+2]]
        i += 3
        break
      case 99:
        return codes
      default:
        console.log(`Terminating program due to error encountered`)
        return codes
    }
  }
}

// Run tests from the challenge description
[
  [ 1,9,10,3,2,3,11,0,99,30,40,50 ],
  [ 1,0,0,0,99 ],
  [ 2,3,0,3,99 ],
  [ 2,4,4,5,99,0 ],
  [ 1,1,1,4,99,5,6,0,99 ]
].forEach( test => {
  console.log(intcode(test)[0])
})

// Now run it on the real challenge input data
const input = require('fs').readFileSync('input.txt')
                           .toString()
                           .split(',')
                           .filter(i => i)
                           .map(i => parseInt(i))
input[1] = 12
input[2] = 2

console.log(`Final value for position 0 is ${intcode(input)[0]}`)

