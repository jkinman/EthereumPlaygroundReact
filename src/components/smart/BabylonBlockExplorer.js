import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ReduxActions from "../../actions";
import EthereumService from "../../services/EthereumService";

import BabylonEthereum from "../babylonScene/BabylonEthereum";
import HUD from "../dumb/HUD/HUD";

class BabylonBlockExplorer extends Component {
  constructor(props, context) {
    super(props, context);
    this.ethereumService = new EthereumService(this.props.actions.addNewBlock, this.props.actions.addERC20Token);
  }

  componentDidMount() {
    this.ethereumService.blockchain = this.props.ethereum;
  }

  showMessage(message) {
    console.log(message);
  }
  render() {
    const { actions, ethereum } = this.props;
    let params = new URLSearchParams(document.location.search.substring(1));
    let cameraType = params.get("camera") || "universal";

    return (
      <div>
        <BabylonEthereum
          actions={actions}
          ethereum={ethereum}
          cameraType={cameraType}
        />
        { (cameraType !== 'vr') && 
        <HUD
          ref="HUD"
          actions={actions}
          ethereum={ethereum}
          ethService={this.ethereumService}
        />
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const props = { ethereum: state.ethereum };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = { ...ReduxActions };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(BabylonBlockExplorer);
