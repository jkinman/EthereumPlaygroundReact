import React, { Component } from 'react';
import './ethereum/ethereum.scss'

//TODO remove this dependency
import EthereumService from '../../services/EthereumService'

//components
import BlockEnhanced from './ethereum/BlockEnhanced'
import BlockDetails from './ethereum/BlockDetails'
import TransactionDetails from './ethereum/TransactionDetails'


export default class PrintEthereum extends Component {

    constructor( props, context){
        super( props, context)
        this.state = {
            hoverId: 0,
        }
    }

    showTransactionDetails( transaction ) {
        this.props.ethService.loadTransaction( transaction,
            (err, data) => {
                this.refs.TransactionDetails.open( data )
            } )
    
      }
    
      showDetails( block ) {
        this.refs.blockDetails.open( block )
      }
    
      showToolTip( data ) {
        if( !data ){
          this.refs.hoverInfo.style.display = 'none'
        }
        else{
          this.refs.hoverInfo.innerText = data
          this.refs.hoverInfo.style.display = 'block'
        }
      }
    
    render() {
    
        return (
          <div className="index">
            <h1>Ethereum Blockchain Bitmap Visualization</h1>
            <h3>The transactions in every block are being concatenated and converted to RGB values and the result is being rendered to a bitmap.</h3>
            <h3>Click the blocks to inspect</h3>

            <h3>Each group of squares represents one transaction, each group of transactions is a block.</h3>
            
            <p ref="data"></p>
            <div className="transtooltip" ref="hoverInfo">hover</div>
    
            <div className="blockContainer">
              { this.props.ethereum && 
                this.props.ethereum.blockArray.map( 
                  (block, i) => {
                    return (
                    <div key={i} >
                      <BlockEnhanced
                      showBlock={ this.showDetails.bind(this) }
                      showTransactionDetails={this.showTransactionDetails.bind(this)}
                      toolTipCB={ this.showToolTip.bind(this) } 
                      block={block} 
                      tilt={this.state.hoverId == i} 
                      index={i} key={i+'block'} />
                    </div>
                    )
                  }
                )}
            </div>
              <BlockDetails ref="blockDetails" />
              <TransactionDetails ref="TransactionDetails" />
          </div>
        );
      }
    }
