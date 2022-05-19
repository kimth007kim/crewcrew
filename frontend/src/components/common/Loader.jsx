import React from 'react';
import ReactLoading from 'react-loading';

function Loader({ type = 'spin', color, height = 200, width = 200 }) {
  return <ReactLoading type={type} color={color} height={height} width={width} />;
}
export default Loader;
