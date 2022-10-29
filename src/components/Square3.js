import React from "react";
import Piece from "./Piece3";
import Mover from "./Mover";
class Square extends React.Component{
    // --------------------------------------- CONSTRUCTOR
    constructor(props){
        super(props)
        this.state={
            piece:props.game.get(props._sqr),
            color:props.color,
            preMoveHilight:false,
        }
        this.defaultColor=props.color
        this.unicodes={
            'wk':'\u2654','wq':'\u2655','wr':'\u2656','wb':'\u2657','wn':'\u2658','wp':'\u2659',
            'bk':'\u265A','bq':'\u265B','br':'\u265C','bb':'\u265D','bn':'\u265E','bp':'\u265F',
        }
        this.board=props.board
        this._sqr=props._sqr
    }

    // --------------------------------------- UPDATE
    update(){
        this.setState({
            piece:this.props.game.get(this.props._sqr)
        })
    }

    // --------------------------------------- CLEAR
    clear(){
        this.setState({
            preMoveHilight:false,
            color:this.defaultColor
        })
    }
    debug(){this.setState({color:"rgba(0,0,0,0.5)"})}

    // --------------------------------------- ADD MOVER
    addMover(){
        this.setState({preMoveHilight:true})
    }
    // --------------------------------------- RENDER
    render(){
        return(<>
            <div 
                className="Square"
                key={this.props._sqr}
                style={{backgroundColor:this.state.color}}
                onClick={()=>{this.board.handleSquareClick(this._sqr)}}
                >

                    <div className="sqrName">{this.props._sqr}</div>

                    {this.state.piece && 
                        <Piece 
                        piece={this.state.piece}
                        unicodes={this.unicodes}
                        board={this.board}
                        square={this}
                        />}

                    {(this.state.preMoveHilight) &&
                        <Mover board={this.props.board} _sqr={this._sqr}/>
                    }

                    
            </div>
        </>)
    }
}
export default Square