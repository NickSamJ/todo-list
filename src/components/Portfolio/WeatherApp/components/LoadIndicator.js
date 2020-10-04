import React from 'react';
import { ReactComponent as LoaderImage } from '../images/loader.svg';
const LoadIndicator = (props) => {
  return (
    <div className='loader'>
      <LoaderImage />
    </div>
  );
};

export default LoadIndicator;
