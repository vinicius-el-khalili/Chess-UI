console.log("\n\n")
const Chess = require('chess.js')
const chess = new Chess.Chess()
chess.move('e4')
chess.move('e5')
let moves = chess.moves({square:"d1"})
let formattedMoves = []
moves.forEach(move=>{
    move.length>=3 ?
        formattedMoves.push(move.slice(1,3)) :
        formattedMoves.push(move)
})

let flag = false
let sqr = "g4"
moves.forEach(move=>{
    let compare
    move.length>=3 ?
        compare = move.slice(1,3) :
        compare = move
    if(compare===sqr){flag=true} 
})

console.log(moves)
console.log(formattedMoves)
console.log(sqr,flag)
console.log('c4 moves:',chess.moves({square:"c4"}).length)
flag = false
if (chess.moves({square:"c4"}).length==0){
    flag=true
}
console.log('flag:',flag)
console.log(chess.get("a4"))