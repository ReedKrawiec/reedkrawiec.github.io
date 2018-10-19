import * as React from "react";

interface IfProps {
  condition:boolean;
}
interface IfState {

}

class If extends React.Component<IfProps,IfState>{
  render():any{
    let {condition} = this.props;
    if(condition)
      return this.props.children;
    return <div></div>;
  }
}
export default If;