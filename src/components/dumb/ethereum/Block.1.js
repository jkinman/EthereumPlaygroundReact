import React from 'react';

const Block = props => {

    return(
      <div className="block" key={props.index}>
         <h1>{`Block # ${props.block.number}`}</h1>
        {/*<h2>{props.block.hash}</h2> */}
        <img 
          src={props.block.image} 
          className={ props.tilt ? 'blockImage tilt' : 'blockImage'}
          alt={`Block Number: ${props.block.number}`}/>
      </div>
      )
  }

  export default Block;
