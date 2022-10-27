console.log("\n\n")
const Chess = require('chess.js')
const chess = new Chess.Chess()
for (let i=0;i<=7;i++){for(let j=0;j<=7;j++){
    let _sqr = 'abcdefgh'[i]+'12345678'[j]
    console.log(_sqr)
}}