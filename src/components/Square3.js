import React from "react";
class Square extends React.Component{
    render(){
        return(
            <div className="Square">{this.props.children}</div>
        )
    }
}
export default Square