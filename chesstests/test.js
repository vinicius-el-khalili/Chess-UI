const Chess = require('chess.js')
const chess = new Chess.Chess()
const c = stuff=>console.log(stuff)
console.log(chess.moves({square:"g1"}))
chess.move("e4")
chess.move("e5")
chess.move("Nf3")
chess.move("Nf6")
console.log(chess.ascii())
console.log(chess.moves({square:"f3"}))
