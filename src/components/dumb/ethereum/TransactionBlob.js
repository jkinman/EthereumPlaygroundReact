import React from 'react';

import DomPixel from './DomPixel'

const TransactionBlob = props => {

    return (
      <div 
        // onMouseEnter={ () => props.toolTipCB( props.transaction ) } 
        // onMouseLeave={ () => props.toolTipCB( false ) }
        // onClick={ ()=> props.showTransactionDetails(props.transaction) }      
        className="TransactionBlob" data-tip={ `Transaction: ${props.transaction}` }>
        {props.pixels.map( (pixel, i) => 
            <DomPixel key={ i } pixel={pixel} /> )
        }
      </div>
    )
  }
  
export default TransactionBlob;
