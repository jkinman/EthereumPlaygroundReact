import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { addNewBlock } from '../../actions/';
import * as ReduxActions from '../../actions'

import PrintEthereum from '../dumb/PrintEthereum'

class PollEthereum extends Component {
    render() {
        const {actions, ethereum} = this.props;
        return <PrintEthereum actions={actions} ethereum={ethereum}/>;
    }
    
}

function mapStateToProps(state) {
    const props = { ethereum: state.ethereum };
    return props;
}

  function mapDispatchToProps(dispatch) {
    const actions = { addNewBlock:ReduxActions.addNewBlock };
    const actionMap = { actions: bindActionCreators(actions, dispatch) };
    return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(PollEthereum);
  