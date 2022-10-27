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
    }

    // --------------------------------------- FLIP BOARD
    flipBoard(color){
        if(this.state.boardOrientation==="white"){
            this.setState({layout:layout.black, boardOrientation:"black"})
        } else {
            this.setState({layout:layout.white, boardOrientation:"white"})
        }
    }

    // --------------------------------------- MOVE PIECE
    movePiece(){
        this.state.game.move("e4")
    }

    // --------------------------------------- RENDER
    render(){
        var container = []
        for (let i=0;i<=7;i++){
            let row=[]
            for (let j=0;j<=7;j++){
                row.push(
                    <Square _sqr={"abcdefgh"[i]+"12345678"[j]} game={this.state.game}/>
                )
            }
            container.push(
                <div className="row" style={this.state.layout.row}>
                    {row}
                    </div>
            )
        }
{}        return(
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