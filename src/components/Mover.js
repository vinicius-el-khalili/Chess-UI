import React from "react";
class Mover extends React.Component{
    constructor(props){
        super(props)
        this.board=this.props.board
        this._sqr=this.props._sqr
    }
    render(){
        return(<>
        
            <div className="Mover">
                <div className="MoverMarker"
                onClick={()=>{this.board.handleMoverClick(this._sqr)}}>

                </div>
            </div>

        </>)
    }
}
export default Mover