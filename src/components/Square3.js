import React from "react";
class Square extends React.Component{
    // props: (children)
    render(){
        return(
            <div className="Square">{this.props.children}</div>
        )
    }
}
export default Square