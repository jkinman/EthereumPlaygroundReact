import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions'
import EthereumService from '../../services/EthereumService'

import PrintEthereum from '../dumb/PrintEthereum'

class PollEthereum extends Component {

    constructor( props, context ) {
        super( props, context)
        this.ethereumService = new EthereumService(this.props.actions.addNewBlock )
    }

    componentDidMount() {
        this.ethereumService.blockchain = this.props.ethereum
    }

    render() {
        const {actions, ethereum} = this.props;
        return <PrintEthereum actions={actions} ethereum={ethereum} ethService={ this.ethereumService } />;
    }
}

function mapStateToProps(state) {
    const props = { ethereum: state.ethereum };
    return props;
}

  function mapDispatchToProps(dispatch) {
    const actions = { ...ReduxActions  };
    const actionMap = { actions: bindActionCreators(actions, dispatch) };
    return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(PollEthereum);
  