import React from "react";
export default class Square extends React.Component{
    constructor(props){
        super(props)
        this.sqr = props.sqr
        this.board = props.board
    }
    state = {
        selected:false,
    }
    render(){
        return(
            <div className="Square" onClick={()=>this.board.handleClick()}>
                {this.sqr}
            </div>
        )
    }
}