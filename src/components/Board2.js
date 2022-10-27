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
        this.flipBoard=this.flipBoard.bind(this)

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
            playercolor:"black",
            squares:this.fillSquares(),
        })

    }
    
    fillSquares(){

        let squares=Array(8).fill().map(()=>Array(8).fill(0))
        const horizontal = this.state.playercolor==="white" ? "abcdefgh" : "hgfedcba"
        const vertical = this.state.playercolor==="white" ? "87654321" : "12345678"
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
    handleClick(_sqr){

        if (!this.chess.get(_sqr)){

            this.setState({
                preMove:false,
                selectedSquare:null
            })
            this.unselectAll()
        
        }

        if (!this.state.preMove){

            this.unselectAll()  

            this.reff[_sqr].current.select()
            this.setState({selectedSquare:_sqr})

            this.chess.moves({square:_sqr}).forEach(move=>{
                
                move.length>=3 ? 
                    this.reff[move.slice(1,3)].current.select()
                    :
                    this.reff[move].current.select()
            
                })
            
            this.setState({preMove:true})
            
        } else {

            var legalMove = false
            this.chess.moves({square:this.state.selectedSquare}).forEach( move=>{
                let compare
                move.length>=3 ?
                    compare = move.slice(1,3) :
                    compare = move
                if (compare === _sqr){
                    legalMove = true
                }
            })
            
            if (legalMove){
                this.reff[_sqr].current.move()
                this.unselectAll()
                this.setState({
                    preMove:false,
                    selectedSquare:null
                })

            }

        }



    }
    
    flipBoard(){
        if (this.state.playercolor==="white"){
            this.setState({playercolor:"black"})
        }else{
            this.setState({playercolor:"white"})
        }
        this.setState({squares:this.fillSquares()})
        this._sqr_keys.map(_s=>{
            this.reff[_s].current.unselect()
        })
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