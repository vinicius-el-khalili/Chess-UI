console.log("\n\n")
const Chess = require('chess.js')
const chess = new Chess.Chess()
chess.move('e4')
chess.move('e5')
let moves = chess.moves({square:"a2"})
let formattedMoves = []
moves.forEach(move=>{
    console.log(move.length)
    formattedMoves.push(move.slice(1,3))
})
console.log(moves)
console.log(formattedMoves)