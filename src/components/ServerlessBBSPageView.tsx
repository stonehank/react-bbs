import React from 'react';
import useServerLayer from '../hooks/useServerLayer';
import BBSPageViewCore from './core/BBSPageViewCore';
import { BBSPageViewProps } from '../types';

function ServerlessBBSPageView({uniqStr=window.location.origin + window.location.pathname}:BBSPageViewProps) {
  const {loading, useConvertLayer}=useServerLayer()
  if(loading)return null
  return (
    <BBSPageViewCore uniqStr={uniqStr} useConvertLayer={useConvertLayer} />
  );
}

export default React.memo<BBSPageViewProps>(ServerlessBBSPageView);
