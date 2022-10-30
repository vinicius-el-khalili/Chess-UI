import { Chess } from "chess.js";
import React from "react";
import Square from "./Square3";

// --------------------------------------- LAYOUT
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
// --------------------------------------- BOARD
class Board extends React.Component{
    constructor(){
        super()
        this.state={
            boardOrientation:"white",
            layout:layout.white,
            game:new Chess(),
            selectedSquare:null,
            selectedPiece:null,
            console:null,
        }
        this.flipBoard=this.flipBoard.bind(this)
        this.reff={}
        this._SQRS = []
        for (let i=0;i<=7;i++){
            for (let j=0;j<=7;j++){
                this.reff['abcdefgh'[i]+'12345678'[j]] = React.createRef()
                this._SQRS.push('abcdefgh'[i]+'12345678'[j])
            }
        }
    }

    // --------------------------------------- FLIP BOARD
    flipBoard(){
        if(this.state.boardOrientation==="white"){
            this.setState({layout:layout.black, boardOrientation:"black"})
        } else {
            this.setState({layout:layout.white, boardOrientation:"white"})
        }
    }
    // --------------------------------------- STRING MAMBO JAMBO
    stringConverter(move,format,_moverSqr){
        // -------------------------------------------------- FUNCTIONS
        const preProcess = (move) => {
            let turn = this.state.game.turn()
            let _m = move
            _m = _m
            // remove useless notation
            .replace('x','')
            .replace('+','')
            .replace('#','')            
            // Pawns
            if (_m[0]===_m[0].toLowerCase() && _m.length===3){_m='P'+_m.slice(1,3)}
            if(_m.length===2){_m='P'+_m}    
            // check for castling
            if (_m==='O-O' && turn==='w'){_m = 'Kg1'}
            if (_m==='O-O' && turn==='b'){_m = 'Kg8'}
            if (_m==='O-O-O' && turn==='w'){_m = 'Kc1'}
            if (_m==='O-O-O' && turn==='b'){_m = 'Kc8'}
            return _m
        }
        const mapSAN = () => {
            // Object: { Simplified Notation ("Ne7") : Standard Algebraic Notation (Ngxe7#) }        
            let moves = this.state.game.moves()
            let map = {}  
            moves.forEach(move=>{
                let _m = preProcess(move)
                // check for promotions
                if (_m.includes("=")){
                    let _l = _m.length
                    _m = "P"+_m.slice(_l-4,_l-2)
                }
                // Push string
                map[_m] = move
            })
            return map
        }
        // -------------------------------------------------- SQUARE
        if (format==="SQR"){
            let _m = preProcess(move)
            // check for promotions
            if (_m.includes("=")){
                let _l = _m.length
                _m = _m.slice(_l-4,_l-2)
            } else {
                let _l = _m.length
                _m = _m.slice(_l-2,_l)
            }
            return _m
        }
        // -------------------------------------------------- SAN
        if (format==="SAN"){
            const NotationToSAN = mapSAN()
            let _san = NotationToSAN[
                this.state.selectedPiece.type.toUpperCase()
                +_moverSqr]
            
            //      -> solve superpositions
            //  rank superposition
            if (!_san){
                _san = NotationToSAN[
                    this.state.selectedPiece.type.toUpperCase()
                    +this.state.selectedSquare[0]
                    +_moverSqr]
            }
            //  row superposition
            if (!_san){
                _san = NotationToSAN[
                    this.state.selectedPiece.type.toUpperCase()
                    +this.state.selectedSquare[1]
                    +_moverSqr]
            }
            return _san
        }

    }

    // --------------------------------------- HANDLE PIECE CLICK
    handlePieceClick(_sqr){
        
        this.clear()
        let _pm = this.state.game.moves({square:_sqr}).join(',')
        let _gm = this.state.game.moves().join(',')
        this.setState({
            selectedSquare:_sqr,
            selectedPiece:this.state.game.get(_sqr),
            console:{
                globalmoves:'global moves: '+_gm,
                piecemoves:'global moves: '+_pm
            }
        })
        const moves = this.state.game.moves({square:_sqr})
        moves.forEach(move=>{            
            let _m = this.stringConverter(move,"SQR",null) // "Ngxe7+" --> "e7"
            this.reff[_m].current.addMover()
        })
    }
    
    // --------------------------------------- HANDLE MOVER CLICK
    handleMoverClick(_sqr){
        let _san = this.stringConverter(null,"SAN",_sqr) // "Pd8" -> "exd8=Q#"
        this.state.game.move(_san)
        this.update()
    }

    // --------------------------------------- CLEAR
    clear(){
        this._SQRS.forEach(_sqr=>this.reff[_sqr].current.clear())
        this.setState({
            selectedSquare:null,
            selectedPiece:null,
        })

    }
        
    // --------------------------------------- UPDATE
    update(){

        this._SQRS.forEach(_sqr=>this.reff[_sqr].current.update())
        this.clear()
    }

    // --------------------------------------- RENDER
    render(){
        var container = []
        for (let i=0;i<=7;i++){
            let row=[]
            for (let j=0;j<=7;j++){
                let _sqr = "abcdefgh"[i]+"12345678"[j]
                row.push(

                    <Square // --------------------------------------- />
                    _sqr={_sqr}
                    ref={this.reff[_sqr]}
                    game={this.state.game}
                    color={(i+j)%2!==0 ? "white" : "cornflowerblue"}
                    board={this}
                    />
                )
            }
            container.push(
                <div className="row" style={this.state.layout.row}>
                    {row}
                    </div>
            )
        }
        return(
            <>
            <div className="Board" style={this.state.layout.board}>
                {container} 
            </div>
            <div className="console">{this.state.console?this.state.console.globalmoves:null}</div>
            <div className="console">{this.state.console?this.state.console.piecemoves:null}</div>
            </>
        )
    }
}
export default Board