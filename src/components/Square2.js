import React from "react";
class Square extends React.Component{
    constructor(props){
        super(props)
    }
    
    state={
        color:this.props.color
    }

    render(){
        return(
            <>
            <div
            className="Square"
            style={{backgroundColor:this.state.color}}
            onClick={()=>this.props.board.handleClick()}
            >
                {this.props.txt}
            </div>
            </>
        )
    }
}
export default Square