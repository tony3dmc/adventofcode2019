const total = (input) => {
  const calculateFuel = (mass) => {
    if (mass < 9)
      return 0

    const fuel = Math.floor(mass / 3) - 2
    return fuel + calculateFuel(fuel)
  }

  const fuel = input.reduce(
    (acc, cur) => acc + calculateFuel(cur)
  , 0)

  return fuel
}

// Run tests from the challenge description
[ 12, 14, 1969, 100756 ].forEach(test => {
  console.log(`Test fuel required for ${ test } is ${ total([test]) }`)
})

// Now run it on the real challenge input data
const input = require('fs').readFileSync('input.txt')
                           .toString()
                           .split('\n')
                           .filter(i => i)
                           .map(i => parseInt(i))

console.log(`Actual fuel required is ${ total(input) }`)
