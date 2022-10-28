import React from "react";
class Square extends React.Component{
    constructor(props){
        super(props)
        this.state={
            piece:props.game.get(props._sqr),
            color:props.color
        }
        this.unicodes={
            'wk':'\u2654',
            'wq':'\u2655',
            'wr':'\u2656',
            'wb':'\u2657',
            'wn':'\u2658',
            'wp':'\u2659',
            'bk':'\u265A',
            'bq':'\u265B',
            'br':'\u265C',
            'bb':'\u265D',
            'bn':'\u265E',
            'bp':'\u265F',

        }
    }
    renderPiece(p){

    }
    update(){
        this.setState({
            piece:this.props.game.get(this.props._sqr)
        })
    }
    render(){
        return(
            <div 
            className="Square"
            key={this.props._sqr}
            style={{backgroundColor:this.state.color}}
            >
                
                {this.state.piece && 
                    <p className="Piece">#</p>}
                </div>
        )
    }
}
export default Square