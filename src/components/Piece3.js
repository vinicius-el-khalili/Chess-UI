import React from "react";
class Piece extends React.Component{
    // --------------------------------------- CONSTRUCTOR
    constructor(props){
        super(props)
        this.state={}
    }

    // --------------------------------------- RENDER
    render(){
        return(
            <div className="Piece" 
            onClick={()=>{this.props.board.handlePieceClick(this.props.square._sqr)}}>
                
                {this.props.unicodes[this.props.piece.color+this.props.piece.type]}

            </div>
        )
    }
}

export default Piece