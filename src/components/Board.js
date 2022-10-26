import React from "react";
import Square from "./Square";
import { Chess } from "chess.js";
export default class Board extends React.Component{
    constructor(props){
        super(props)
        this.squares=Array(8).fill().map(()=>Array(8).fill(0))
        this.fillsquares("white")
        this.chess = new Chess()
    }
    state = {
        message:"hello!!!"
    }
    fillsquares(playercolor){
        const horizontal = playercolor==="white" ? "abcdefgh" : "hgfedcba"
        const vertical = playercolor==="white" ? "87654321" : "12345678"
        for (let i=0;i<=7;i++){for(let j=0;j<=7;j++){
            this.squares[i][j]=(
            <Square 
                sqr={horizontal[j]+vertical[i]}
                board={this}
            />     
            )
        }}
    }
    handleClick(){
        this.setState({message:"YOLO!"})
    }
    render(){
        return(
            <>
            <button onClick={this.handleClick()}>button</button>
            <div className="Board">
                {this.squares}
            </div>
            <h1>{this.state.message}</h1>
            </>
        )
    }
}