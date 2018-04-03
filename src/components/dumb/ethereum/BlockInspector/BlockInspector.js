import React from 'react';
import ReactDOM from 'react-dom'
import '../ethereum.scss';


class BlockInspector extends React.Component{
  
    constructor(p){
        super(p)
      this.state = {element:null}
    }
    componentDidMount() {
        debugger
    }
    activate() {

    }
    setElement( comp ) {
    this.setState({element:comp})
    }
 
  zoomIn() {

    this.el = ReactDOM.findDOMNode(this)
    // const zoomInAnim = new Tween( )
  }

  render() {
    const { children, element} = this.props

    console.log(children)
  return(
      <div ref="content">
    {this.state.element}
    </div>
    )
  }
}
  

  export default BlockInspector;
