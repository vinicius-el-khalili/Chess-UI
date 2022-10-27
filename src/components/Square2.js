import React from "react";
class Square extends React.Component{

    defaultColor=this.props.color
    state={
        color:this.props.color,
        selected:false,
        move:false
    }
    
    select(){
        this.setState({selected:true})
    }

    unselect(){
        this.setState({selected:false})
    }

    move(){
        this.setState({move:true})
    }

    render(){
        return(
            <>
            <div className="Square"
                style={{backgroundColor:this.state.selected ? "tomato" : this.defaultColor}}
                onClick={()=>this.props.board.handleClick(this.props._sqr)}>
                {this.props._sqr}..{this.props._key}
                <br/>{this.props.board.chess.get(this.props._sqr).type}{this.state.move?"!":""}
            </div>
            </>
        )
    }
}
export default Square