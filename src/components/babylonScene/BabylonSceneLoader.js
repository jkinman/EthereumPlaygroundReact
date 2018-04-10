import React, {Component} from 'react'

// babylon logic
import BabylonEthereum from './BabylonEthereum'
class BabylonSceneLoader extends Component {

	constructor(props) {
		super(props)
		this.scene = new BabylonSceneLoader()
	}

	componentDidMount() {
		BabylonSceneLoader.mount( {canvasId:'babylon-scene'})
	}

	render() {

		return(
			<div className="babylon-scene-loader">
				<canvas id="babylon-scene" />
			</div>
		)
	}
}

export default BabylonSceneLoader;