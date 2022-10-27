import React from "react";
class Square extends React.Component{

    defaultColor=this.props.color
    state={}
    
    componentDidMount(){
        this.setState({
            color:this.props.color,
            selected:false,
            piece:this.props.board.chess.get(this.props._sqr).type
        })
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

    updateGame(){
        let p=this.props.board.chess.get(this.props._sqr).type
        this.setState({
            piece:this.props.board.chess.get(this.props._sqr).type
        })
    }

    render(){
        return(
            <>
            <div className="Square"
                style={{backgroundColor:this.state.selected ? "tomato" : this.defaultColor}}
                onClick={()=>this.props.board.handleClick(this.props._sqr)}>
                
                {this.props._sqr}
                <br/>
                <strong>{this.state.piece}</strong>

            </div>
            </>
        )
    }
}
export default Square