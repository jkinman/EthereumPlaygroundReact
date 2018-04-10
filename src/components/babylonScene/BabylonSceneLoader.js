import React, {Component} from 'react'

// styles
import './BabylonScene.scss'

// babylon logic
import BabylonEthereum from './BabylonEthereum'

class BabylonSceneLoader extends Component {

	constructor(props) {
		super(props)
		this.babylonEth = new BabylonEthereum( this.props )
	}

	componentDidMount() {
		this.babylonEth.mount( {canvasId:'renderCanvas'})
	}
	componentWillReceiveProps( newProps ){
		this.babylonEth.newBlock( newProps.ethereum.latestBlock)
	}
	render() {

		return(
			<div className="babylon-scene-loader">
				<canvas id="renderCanvas" />
			</div>
		)
	}
}

export default BabylonSceneLoader;