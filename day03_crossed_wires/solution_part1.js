const home = { x: 0, y: 0 }

const samePos = (a, b) => a.x == b.x && a.y == b.y
const isHome = (pos) => samePos(pos, home)
const manhatten = (pos) => Math.abs(pos.x) + Math.abs(pos.y)

const generateRange = (from, to) => {
  const range = []
  const dx = to.x - from.x
  const dy = to.y - from.y

  if (dx == 0) {
    for (let i = 0; i <= Math.abs(dy); i++) {
      range.push({
        x: from.x,
        y: from.y + i * (dy < 0 ? -1 : 1)
      })
    }
  } else {
    for (let i = 0; i <= Math.abs(dx); i++) {
      range.push({
        x: from.x + i * (dx < 0 ? -1 : 1),
        y: from.y
      });
    }
  }
  return range
}

const checkCrossing = (a1, a2, b1, b2) => {
  if (isHome(a1) || isHome(b1))
    return false

  ra = generateRange(a1, a2)
  rb = generateRange(b1, b2)

  const crossings = []
  ra.forEach(a => {
    rb.forEach(b => {
      if (samePos(a, b)) {
        crossings.push({
          x: a.x,
          y: a.y
        })
      }
    })
  })

  return crossings
}

const closestCrossingPoint = (wires) => {
  const wirePositions = {}
  wires.forEach((wire, id) => {
    wirePositions[id] = [ Object.assign({}, home) ]
    const position = Object.assign({}, home)
    wire.forEach(op => {
      const [ direction, distance ] = [ op.substring(0, 1), parseInt(op.substring(1)) ]
      switch (direction) {
        case 'U': position.y += distance; break
        case 'R': position.x += distance; break
        case 'D': position.y -= distance; break
        case 'L': position.x -= distance; break
      }
      wirePositions[id].push({x: position.x, y: position.y})
    })
  })

  const crossings = []
  for (let myId in wirePositions) {
    let myLastPosition = Object.assign({}, home)
    wirePositions[myId].forEach(myPosition => {
      for (let theirId in wirePositions) {
        if (myId == theirId)
          continue

        let theirLastPosition = Object.assign({}, home)
        wirePositions[theirId].forEach(theirPosition => {
          results = checkCrossing(myLastPosition, myPosition, theirLastPosition, theirPosition)
          if (results)
            crossings.push(...results)

          theirLastPosition = theirPosition
        })
      }
      myLastPosition = myPosition
    })
  }
  return Math.min(...crossings.map(c => manhatten(c)))

}

// Run tests from the challenge description
[
  [
    [ 'R75','D30','R83','U83','L12','D49','R71','U7','L72' ],
    [ 'U62','R66','U55','R34','D71','R55','D58','R83' ]
  ],
  [
    [ 'R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51' ],
    [ 'U98','R91','D20','R16','D67','R40','U7','R15','U6','R7' ]
  ]
].forEach(test => {
  console.log(`Test crossing distance is ${closestCrossingPoint(test)}`)
})

// Now run it on the real challenge input data
const input = require('fs').readFileSync('input.txt')
                           .toString()
                           .split('\n')
                           .filter(i => i)
                           .map(i => i.split(','))

console.log(`Closest crossing distance is ${closestCrossingPoint(input)}`)

