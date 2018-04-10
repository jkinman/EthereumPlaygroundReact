import React from 'react';

const BlockDivs = props => {

  return(
    <div key={props.index}>
      {props.block.pixelArray.map( (pixel,y) => {
        let pixelStyle = {
          color:`rgb(${pixel.r}, ${pixel.g}, ${pixel.b} )`,
          backgroundColor:`rgb(${pixel.r}, ${pixel.g}, ${pixel.b} )`,
          width:SIZE,
          height:SIZE,
          position:'fixed',
          top: Math.round(y / lineLength) * SIZE,
          left: (y % lineLength) * SIZE,
        };
        return( <div style={pixelStyle} key={y}></div>)
      })
    }
  </div>
  )
}

  export default BlockDivs;
