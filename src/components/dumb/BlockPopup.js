import React from 'react';

class BlockPopup extends React.Component {
 
  constructor(props) {
    super(props)

    this.state = {
      visible:false,
      transaction:{},
    }

  }

  componentDidMount() {
    // document.addEventListener('click', this.close.bind(this))
  }

  open( block ) {
    this.setState( {
      visible: true, 
      block,
    },

  }

  close() {
    this.setState( {visible: false})
  }

  render() {
    const { block } = props
    {
      <div>
        <div className="blockDetails">

        </div>
      </div>
    )
  }

}

export default BlockPopup

