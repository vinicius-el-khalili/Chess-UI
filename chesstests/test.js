console.clear()
const Chess = require('chess.js')
let fen=
'rnb2rk1/pp2qp1p/2p2n1p/3pp3/2BPP3/P1P2N2/P2Q1PPP/R3R1K1 w - - 3 12'
const chess = new Chess.Chess(fen)

// -------------------------------- //
const sanConverter = (moves,to)=>{
    let formattedMoves = {}   
    moves.forEach(move=>{
        let _m = move
        _m = _m
            .replace('x','')
            .replace('+','')
            .replace('#','')
        if (_m[0]==_m[0].toLowerCase() && _m.length===3){
            _m='P'+_m.slice(1,3)
        }
        if(_m.length==2){
            _m='P'+_m
        }

        // Castle
        if (_m==='O-O' && chess.turn()==='w'){_m = 'Kg1'}
        if (_m==='O-O' && chess.turn()==='b'){_m = 'Kg8'}
        if (_m==='O-O-O' && chess.turn()==='w'){_m = 'Kc1'}
        if (_m==='O-O-O' && chess.turn()==='b'){_m = 'Kc8'}
        
        // Rook bugs
        if (_m.length===4 && _m[0]==="R"){
            _m = "R"+_m.slice(2,4)
        }
        // Push string
        if(to==="toSan"){formattedMoves[_m] = move}
        if(to==="toNotation"){formattedMoves[move] = _m}
    })
    return formattedMoves
}


console.log(sanConverter(chess.moves(), "toNotation"))
chess.move("Rab1")
console.log(chess.moves({square:"a1"}))
console.log(chess.ascii())

const name ="123456"
let l = name.length
console.log(name.slice(l-2,l))