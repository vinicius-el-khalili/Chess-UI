import React from "react";
import Square from "./Square";
export default class Board extends React.Component{
    constructor(props){
        super(props)
        this.squares=Array(8).fill().map(()=>Array(8).fill(0))
        this.fillsquares("black")
    }
    fillsquares(playercolor){
        const horizontal = playercolor==="white" ? "abcdefgh" : "hgfedcba"
        const vertical = playercolor==="white" ? "87654321" : "12345678"
        for (let i=0;i<=7;i++){for(let j=0;j<=7;j++){
            this.squares[i][j]=(<Square sqr={horizontal[j]+vertical[i]}></Square>)
        }}
    }
    render(){
        return(
            <div className="Board">
                {this.squares}
            </div>
        )
    }
}