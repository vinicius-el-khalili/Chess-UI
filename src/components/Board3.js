import React from "react";
import Square from "./Square3";
class Board extends React.Component{
    constructor(){
        super()
        this.state={
            boardStyle:{backgroundColor:"cornflowerblue"}
        }
        this.change=this.change.bind(this)
    }
    change(){
        this.setState({
            boardStyle:{backgroundColor:"tomato"}
        })
    }
    render(){
        return(
            <>
            <div className="Board" 
            style={this.state.boardStyle}>
                <Square>1</Square>
                <Square>2</Square>
                <Square>3</Square>
                <Square>4</Square>
                <Square>5</Square>
            </div>
            <button onClick={this.change}>color</button>
            </>
        )
    }
}
export default Board