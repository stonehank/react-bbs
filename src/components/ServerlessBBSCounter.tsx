import React from 'react';
import useServerLayer from '../hooks/useServerLayer';
import BBSCounterCore from './core/BBSCounterCore';
import { BBSCounterProps } from '../types';



function ServerlessBBSCounter({uniqStr}:BBSCounterProps) {
  const {loading, useConvertLayer}=useServerLayer()
  if(loading)return null
  return (
    <BBSCounterCore uniqStr={uniqStr} useConvertLayer={useConvertLayer} />
  );
}

ServerlessBBSCounter.defaultProps = {
  uniqStr: window.location.origin + window.location.pathname
}
export default React.memo<BBSCounterProps>(ServerlessBBSCounter)
