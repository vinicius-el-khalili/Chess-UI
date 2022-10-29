const Chess = require('chess.js')
let fen=
'r3k2r/ppp2ppp/2nq1n2/2bppb2/2BPPB2/2NQ1N2/PPP2PPP/R3K2R w KQkq - 6 8'
const chess = new Chess.Chess(fen)

console.log(chess.ascii())
console.log('moves:',chess.moves())
console.log('piece moves:',chess.moves({square:"d5"}))
console.log('piece:',chess.get('b8'))