import React from "react";
export default class Square extends React.Component{
    constructor(props){
        super(props)
        this.sqr = props.sqr
    }
    render(){
        return(
            <div className="Square" key={this.sqr}>
                {this.sqr}
            </div>
        )
    }
}