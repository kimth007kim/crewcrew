import React from 'react';
import ReactLoading from 'react-loading';

function Loader({ type = 'spin', color = '#c4c4c4', height = 100, width = 100 }) {
  return <ReactLoading type={type} color={color} height={height} width={width} />;
}
export default Loader;
