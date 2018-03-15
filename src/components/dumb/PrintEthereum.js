import React, { Component } from 'react';


export default class PrintEthereum extends Component {

    render() {
        const { actions, ethereum } = this.props

        return (
            <div>
            {JSON.stringify(ethereum)}
            </div>
        )
    }
}
