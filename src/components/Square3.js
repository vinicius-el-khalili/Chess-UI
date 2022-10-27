import React from "react";
class Square extends React.Component{
    constructor(props){
        super(props)
        this.state={
            piece:props.game.get(props._sqr),
            color:props.color
        }
    }
    update(){
        this.setState({
            piece:this.props.game.get(this.props._sqr)
        })
    }
    render(){
        return(
            <div className="Square" key={this.props._sqr} style={{backgroundColor:this.state.color}}>
                {this.props._sqr}<br/>
                {this.state.piece.type}
                </div>
        )
    }
}
export default Square