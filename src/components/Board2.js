import React from "react";
import { Chess } from "chess.js";
import Square from "./Square2";
class Board extends React.Component{
    
    constructor(props){
        super(props)
        this.chess = new Chess()
        this.flipBoard=this.flipBoard.bind(this)
    }
    
    state={}
    
    componentDidMount(){
        this.setState({
            squares:this.fillSquares(this.state.playercolor),
            playercolor:"white"

        })
    }
    
    fillSquares(playercolor){
        let squares=Array(8).fill().map(()=>Array(8).fill(0))
        const horizontal = playercolor==="white" ? "abcdefgh" : "hgfedcba"
        const vertical = playercolor==="white" ? "87654321" : "12345678"
        for (let i=0;i<=7;i++){for(let j=0;j<=7;j++){
            squares[i][j]=(
                <Square
                    color={(i+j)%2==0 ? "white" : "cornflowerblue"}
                    txt={horizontal[j]+vertical[i]}
                    board={this}
                ></Square>
            )
        }}
        return squares
    }

    handleClick(){
        this.flipBoard()
    }
    flipBoard(){
        if (this.state.playercolor==="white"){
            this.setState({playercolor:"black"})
        }else{
            this.setState({playercolor:"white"})
        }
        this.setState({squares:this.fillSquares(this.state.playercolor)})
    }
    
    render(){
        return(
            <>
            <div className="Board">
                {this.state.squares}
            </div>
            <button onClick={this.flipBoard}>Flip Board</button>
            </>
        )
    }
}
export default Board