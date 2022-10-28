import React from "react";
class Piece extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return(
            <div className="Piece" 
            onClick={()=>{this.props.board.hilightMoves(this.props.square._sqr)}}>
                
                {this.props.unicodes[this.props.piece.color+this.props.piece.type]}
                
            </div>
        )
    }
}

export default Piece