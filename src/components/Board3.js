import React from "react";
import Square from "./Square3";
const layout = {
    white:{
        board:{display:"flex"},
        row:{display:"flex",flexDirection:"column-reverse"}
    },
    black:{
        board:{display:"flex",flexDirection:"row-reverse"},
        row:{}
    }
}
class Board extends React.Component{
    constructor(){
        super()
        this.state={
            layout:layout.white
        }
        this.change=this.change.bind(this)
    }
    change(color){
        this.setState({
            layout:layout.black
        })
    }
    render(){
        return(
            <>
            <div className="Board" 
            style={this.state.layout.board}>
                <div className="row" style={this.state.layout.row}> 
                    <Square>a1</Square>
                    <Square>a2</Square>
                    <Square>a3</Square>
                    <Square>a4</Square>
                    <Square>a5</Square>
                    <Square>a6</Square>
                    <Square>a7</Square>
                    <Square>a8</Square>
                </div>
                <div className="row" style={this.state.layout.row}>
                    <Square>b1</Square>
                    <Square>b2</Square>
                    <Square>b3</Square>
                    <Square>b4</Square>
                    <Square>b5</Square>
                    <Square>b6</Square>
                    <Square>b7</Square>
                    <Square>b8</Square>
                </div>
                <div className="row" style={this.state.layout.row}>
                    <Square>c1</Square>
                    <Square>c2</Square>
                    <Square>c3</Square>
                    <Square>c4</Square>
                    <Square>c5</Square>
                    <Square>c6</Square>
                    <Square>c7</Square>
                    <Square>c8</Square>
                </div>
                <div className="row" style={this.state.layout.row}>
                    <Square>d1</Square>
                    <Square>d2</Square>
                    <Square>d3</Square>
                    <Square>d4</Square>
                    <Square>d5</Square>
                    <Square>d6</Square>
                    <Square>d7</Square>
                    <Square>d8</Square>
                </div>
                <div className="row" style={this.state.layout.row}>
                    <Square>e1</Square>
                    <Square>e2</Square>
                    <Square>e3</Square>
                    <Square>e4</Square>
                    <Square>e5</Square>
                    <Square>e6</Square>
                    <Square>e7</Square>
                    <Square>e8</Square>
                </div>
                <div className="row" style={this.state.layout.row}>
                    <Square>f1</Square>
                    <Square>f2</Square>
                    <Square>f3</Square>
                    <Square>f4</Square>
                    <Square>f5</Square>
                    <Square>f6</Square>
                    <Square>f7</Square>
                    <Square>f8</Square>
                </div>
                <div className="row" style={this.state.layout.row}>
                    <Square>g1</Square>
                    <Square>g2</Square>
                    <Square>g3</Square>
                    <Square>g4</Square>
                    <Square>g5</Square>
                    <Square>g6</Square>
                    <Square>g7</Square>
                    <Square>g8</Square>
                </div>
                <div className="row" style={this.state.layout.row}>
                    <Square>h1</Square>
                    <Square>h2</Square>
                    <Square>h3</Square>
                    <Square>h4</Square>
                    <Square>h5</Square>
                    <Square>h6</Square>
                    <Square>h7</Square>
                    <Square>h8</Square>
                </div>
                
            </div>
            <button onClick={this.change}>change</button>
            </>
        )
    }
}
export default Board