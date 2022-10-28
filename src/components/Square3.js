import React from "react";
import Piece from "./Piece3";
class Square extends React.Component{
    constructor(props){
        super(props)
        this.state={
            piece:props.game.get(props._sqr),
            color:props.color,
            preMoveHilight:true
        }
        this.defaultColor=props.color
        this.unicodes={
            'wk':'\u2654','wq':'\u2655','wr':'\u2656','wb':'\u2657','wn':'\u2658','wp':'\u2659',
            'bk':'\u265A','bq':'\u265B','br':'\u265C','bb':'\u265D','bn':'\u265E','bp':'\u265F',
        }
        this.board=props.board
        this._sqr=props._sqr
    }

    update(){
        this.setState({
            piece:this.props.game.get(this.props._sqr)
        })
    }

    setColor(color){
        this.setState({color:color})
    }

    render(){
        return(<>
            <div 
                className="Square"
                key={this.props._sqr}
                style={{backgroundColor:this.state.color}}
                >
                    
                    {(this.state.preMoveHilight && !this.state.piece) &&
                        <div className="preMoveEmpty"></div>
                    }


                    {(this.state.preMoveHilight && this.state.piece) &&
                        <div className="preMoveOccupied"></div>
                    }

                    {this.state.piece && 
                        <Piece 
                        piece={this.state.piece}
                        unicodes={this.unicodes}
                        board={this.board}
                        square={this}
                        />}
                    
            </div>
        </>)
    }
}
export default Square