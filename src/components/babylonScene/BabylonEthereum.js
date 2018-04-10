import * as BABYLON from 'babylonjs'


class BabylonEthereum {

	constructor(props){
		this.actions= props.actions
		this.ethereum= props.ethereum
		this.ethService= props.ethereumService

	}
	mount(opts) {
		this.canvasId = opts.canvasId
	}

}

export default BabylonEthereum;