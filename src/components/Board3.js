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
            player:"white",
            boardOrientation:"white",
            layout:layout.white,
            game:new Chess()
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

    // --------------------------------------- HANDLE PIECE CLICK
    handlePieceClick(_sqr){
    }
    
    // --------------------------------------- HANDLE SQUARE CLICK
    handleSquareClick(_sqr){

    }

    // --------------------------------------- MOVE PIECE
    movePiece(){
        this.state.game.move("e4")
        this._SQRS.forEach(_sqr=>{
            this.reff[_sqr].current.update()
        })
    }

    // --------------------------------------- CLEAR
    clear(){
        this._SQRS.forEach(_sqr=>this.reff[_sqr].current.clear())
    }

    // --------------------------------------- RENDER
    render(){
        var container = []
        for (let i=0;i<=7;i++){
            let row=[]
            for (let j=0;j<=7;j++){
                let _sqr = "abcdefgh"[i]+"12345678"[j]
                row.push(
                    <Square 
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
            <button onClick={this.flipBoard}>Flip Board</button>
            <h3>Board side: {this.state.boardOrientation}</h3>
            <button onClick={this.movePiece}>Move piece</button>

            </>
        )
    }
}
export default Board