import React from 'react';

const DomPixel = props => {
  const { pixel, toolTipCB } = props;
  let pixelStyle = {
    color:`rgb(${pixel.r}, ${pixel.g}, ${pixel.b} )`,
    backgroundColor:`rgb(${pixel.r}, ${pixel.g}, ${pixel.b} )`,
  };

  return (
    <div className="DomPixel" style={pixelStyle} ></div>
  )
}
  export default DomPixel;
