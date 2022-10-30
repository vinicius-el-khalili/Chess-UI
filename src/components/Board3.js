import { Chess } from "chess.js";
import React from "react";
import Square from "./Square3";

// --------------------------------------- LAYOUT
const layout = {
    white:{
        board:{display:"flex"},
        row:{display:"flex",flexDirection:"column-reverse"}
    },
    black:{
        board:{display:"flex",flexDirection:"row-reverse"},
        row:{}
    }
}
// --------------------------------------- BOARD
class Board extends React.Component{
    constructor(){
        super()
        this.state={
            console1:"",
            console2:"",
            console3:"",
            console4:"",
            console5:"",
            boardOrientation:"white",
            layout:layout.white,
            game:new Chess(),
            selectedSquare:null,
            selectedPiece:null
        }
        this.flipBoard=this.flipBoard.bind(this)
        this.movePiece=this.movePiece.bind(this)
        this.reff={}
        this._SQRS = []
        for (let i=0;i<=7;i++){
            for (let j=0;j<=7;j++){
                this.reff['abcdefgh'[i]+'12345678'[j]] = React.createRef()
                this._SQRS.push('abcdefgh'[i]+'12345678'[j])
            }
        }
    }

    
    // --------------------------------------- FLIP BOARD
    flipBoard(color){
        if(this.state.boardOrientation==="white"){
            this.setState({layout:layout.black, boardOrientation:"black"})
        } else {
            this.setState({layout:layout.white, boardOrientation:"white"})
        }
    }
    
    // --------------------------------------- SAN MAP
    sanConverter(_sqr,to){  // personalized hashmap for the standard algebraic notation
        let moves = this.state.game.moves()
        let formattedMoves = {}  
        let __l=[] 
        moves.forEach(move=>{
            let _m = move
            _m = _m
                .replace('x','')
                .replace('+','')
                .replace('#','')
            if (_m[0]===_m[0].toLowerCase() && _m.length===3){
                _m='P'+_m.slice(1,3)
            }
            if(_m.length===2){
                _m='P'+_m
            }
    
            // Castle
            let turn = this.state.game.turn()
            if (_m==='O-O' && turn==='w'){_m = 'Kg1'}
            if (_m==='O-O' && turn==='b'){_m = 'Kg8'}
            if (_m==='O-O-O' && turn==='w'){_m = 'Kc1'}
            if (_m==='O-O-O' && turn==='b'){_m = 'Kc8'}
            
            // Rook bugs
            if (_m.length===4 && _m[0]==="R"){
                _m = "R"+_m.slice(2,4)
            }

            // Push string
            if(to==="toSan"){formattedMoves[_m] = move}
            if(to==="toNotation"){formattedMoves[move] = _m}
            __l.push([move,_m])
                                                                            this.setState({console3:"converter: "+__l.join(' || ')})
        })
        return formattedMoves
    }
    // --------------------------------------- HANDLE SQUARE CLICK
    handleSquareClick(_sqr){

    }
    
    // --------------------------------------- HANDLE PIECE CLICK
    handlePieceClick(_sqr){
        
        this.clear()
        let piece = this.state.game.get(_sqr)
        this.setState({
            selectedSquare:_sqr,
            selectedPiece:piece
        })
        const moves = this.state.game.moves({square:_sqr})
                                                                            this.setState({console1:"global moves: "+this.state.game.moves().join(" | ")})
                                                                            this.setState({console2:"piece moves: "+this.state.game.moves({square:_sqr}).join(" | ")})

        const SanToNotation = this.sanConverter(_sqr,"toNotation")
        const NotationToSan = this.sanConverter(_sqr,"ToSan")
        moves.forEach(move=>{
            let _m=move

 
            // Handle rooks special syntax because we're calling moves in the square
            // calling chess.moves({square}) -> Rb1
            // calling chess.moves() -> Reb1 *this is the format we want


            let _available_sqr = SanToNotation[_m].slice(1,3)
            this.reff[_available_sqr].current.addMover()
        })

        //this.setState({console:this.state.game.moves({square:_sqr}).join(",")})

        let l=[]
        moves.forEach(move=>{
            let _available_sqr = SanToNotation[move].slice(1,3)
            l.push([move,_available_sqr].join(":"))
        })
    }
    
    // --------------------------------------- HANDLE MOVER CLICK
    handleMoverClick(_sqr){

        const NotationToSAN = this.sanConverter(
            this.state.game.moves({square:this.state.selectedSquare}),
            "toSan")
        this.state.game.move(NotationToSAN[
            this.state.selectedPiece.type.toUpperCase()
            +
            _sqr
        ])
        this.update()
        this.clear()

    }

    // --------------------------------------- MOVE PIECE
    movePiece(){
        
        this.state.game.move("e4")
        this.state.game.move("e5")
        this._SQRS.forEach(_sqr=>{
            this.reff[_sqr].current.update()
        })
        this.clear()
    }

    // --------------------------------------- UTILITIES
    clear(){
        this._SQRS.forEach(_sqr=>this.reff[_sqr].current.clear())
        this.setState({
            selectedSquare:null,
            selectedPiece:null
        })
    }
        
    update(){
        this._SQRS.forEach(_sqr=>this.reff[_sqr].current.update())
    }

    // --------------------------------------- RENDER
    render(){
        var container = []
        for (let i=0;i<=7;i++){
            let row=[]
            for (let j=0;j<=7;j++){
                let _sqr = "abcdefgh"[i]+"12345678"[j]
                row.push(

                    <Square // --------------------------------------- />
                    _sqr={_sqr}
                    ref={this.reff[_sqr]}
                    game={this.state.game}
                    color={(i+j)%2!==0 ? "white" : "cornflowerblue"}
                    board={this}
                    />
                )
            }
            container.push(
                <div className="row" style={this.state.layout.row}>
                    {row}
                    </div>
            )
        }
        return(
            <>
            <div className="Board" style={this.state.layout.board}>
                {container} 
            </div>
            <div>
            <button onClick={this.flipBoard}>Flip Board</button>
            <button onClick={this.movePiece}>Move piece</button>
            <p className="console"><strong>---</strong><br></br>{this.state.console1}</p>
            <p className="console"><strong>---</strong><br></br>{this.state.console2}</p>
            <p className="console"><strong>---</strong><br></br>{this.state.console3}</p>
            <p className="console"><strong>---</strong><br></br>{this.state.console4}</p>
            <p className="console"><strong>---</strong><br></br>{this.state.console5}</p>
            <br /><p><strong>Selected Square: </strong>{this.state.selectedSquare}</p>
            <br /><p><strong>Selected Piece: </strong>{this.state.selectedPiece===null?"null":this.state.selectedPiece.type}</p>
            <br /><strong>Board:</strong>
            <p><strong>fen: </strong>{this.state.game.fen()}</p>
            <p><strong>msg: </strong>{this.state.msg}</p>
            </div>
            </>
        )
    }
}
export default Board