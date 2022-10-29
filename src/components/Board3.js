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
            console:"console",
            boardOrientation:"white",
            layout:layout.white,
            game:new Chess('r3k2r/ppp2ppp/2nq1n2/2bppb2/2BPPB2/2NQ1N2/PPP2PPP/R3K2R w KQkq - 6 8'),
            selectedSquare:null
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
    sanMap = (moves)=>{  // personalized hashmap for the standard algebraic notation
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
            if (_m==='O-O' && this.game.turn()==='w'){_m = 'Kg1'}
            if (_m==='O-O' && this.game.turn()==='b'){_m = 'Kg8'}
            if (_m==='O-O-O' && this.game.turn()==='w'){_m = 'Kc1'}
            if (_m==='O-O-O' && this.game.turn()==='b'){_m = 'Kc8'}
            
            formattedMoves[_m] = move
        })
        return formattedMoves
    }
    // --------------------------------------- HANDLE SQUARE CLICK
    handleSquareClick(_sqr){
        
    }
    
    // --------------------------------------- HANDLE PIECE CLICK
    handlePieceClick(_sqr){
        
        this.clear()
        const moves = this.state.game.moves({square:_sqr})
        let _p = this.state.game.get({square:_sqr})
        moves.forEach(move=>{
            let _m
            _m = move.replace('#','').replace('+','').replace('x','')
            _m = _m.length===2?_m:_m.slice(1,3)
            this.reff[_m].current.addMover()
        })
        this.setState({selectedSquare:_sqr})
        this.setState({console:moves})
    }
    
    // --------------------------------------- HANDLE MOVER CLICK
    handleMoverClick(_sqr){

        this.reff[_sqr].current.debug()
        const moves = this.state.game.moves({square:this.state.selectedSquare})
        moves.forEach(move=>{
            let _m = move.length<3?move:move.slice(1,3)
            if (_m===_sqr){
                this.state.game.move(move)
                this.update()
            }
        })
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
        this.setState({selectedSquare:null})
    }
        
    update(){this._SQRS.forEach(_sqr=>this.reff[_sqr].current.update())}

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
            <p><strong>Possible Moves: </strong>{this.state.console}</p>
            <br /><p><strong>Selected Square: </strong>{this.state.selectedSquare}</p>
            <br /><strong>Board:</strong>
            <p><strong>fen: </strong>{this.state.game.fen()}</p>
            <p><strong>msg: </strong>{this.state.msg}</p>
            </div>
            </>
        )
    }
}
export default Board