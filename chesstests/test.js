console.clear()
const Chess = require('chess.js')
let fen=
'r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 3'
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
        
        if(to==="toSan"){formattedMoves[_m] = move}
        if(to==="toNotation"){formattedMoves[move] = _m}
    })
    return formattedMoves
}
console.log(sanConverter(chess.moves('c6'), "toNotation"))
console.log(chess.moves({square:"c6"}))
