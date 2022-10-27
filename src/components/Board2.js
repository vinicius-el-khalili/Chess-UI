import React from "react";
import { Chess } from "chess.js";
import Square from "./Square2";

class Board extends React.Component{
    
    constructor(){
        
        super()

        this.state={
            playercolor:"white",
            preMove:false,
            selectedSquare:null
        }

        this.chess = new Chess('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2')
        this.moveTEST=this.moveTEST.bind(this)

        this.reff = {}
        this._sqr_keys = []
        const horizontal = this.state.playercolor==="white" ? "abcdefgh" : "hgfedcba"
        const vertical = this.state.playercolor==="white" ? "87654321" : "12345678"
        for (let i=0;i<=7;i++){
            for(let j=0;j<=7;j++){
                let _sqr = horizontal[j]+vertical[i]
                this._sqr_keys.push(_sqr)
                this.reff[_sqr]=React.createRef()
            }
        }

    }

    

    componentDidMount(){
        
        this.setState({
            squares:this.fillSquares("white"),
        })

    }
    
    fillSquares(color){

        let squares=Array(8).fill().map(()=>Array(8).fill(0))
        const horizontal = color==="white" ? "abcdefgh" : "hgfedcba"
        const vertical = color==="white" ? "87654321" : "12345678"
        for (let i=0;i<=7;i++){for(let j=0;j<=7;j++){
            let _sqr = horizontal[j]+vertical[i]
            squares[i][j]=(
                <Square
                    ref={this.reff[_sqr]}
                    color={(i+j)%2===0 ? "white" : "cornflowerblue"}
                    _key={[i,j]}
                    _sqr={_sqr}
                    board={this}
                ></Square>
            )
        }}
        return squares

    }
    unselectAll(){
        this._sqr_keys.map(_s=>{
            this.reff[_s].current.unselect()
        })
    }
    updteAll(){
        this._sqr_keys.forEach(_s=>{
            this.reff[_s].current.updateGame()
        })
    }
    handleClick(_sqr){
        this.unselectAll()
        this.reff[_sqr].current.select()
    }
    
    moveTEST(){
        this.unselectAll()
        this.chess.move("c4")
        this.chess.move("c5")
        this.updteAll()
    }

    render(){
        return(
            <>
            <div className="Board">
                {this.state.squares}
            </div>
            <button onClick={this.moveTEST}>Move piece</button>
            </>
        )
    }
}
export default Board