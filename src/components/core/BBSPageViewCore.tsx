import React, { useEffect, useState } from 'react';
import {  ConvertLayerIInterface } from '../../types';
import Loading from '../UI/Loading';
interface PageViewProps extends React.HTMLAttributes<HTMLSpanElement>{
  uniqStr:string,
  useConvertLayer: () => ConvertLayerIInterface;
}
function BBSPageViewCore({ uniqStr, useConvertLayer, ...otherProps }:PageViewProps) {
  const [loading, setLoading]=useState<boolean>(true)
  const [count, setCount]=useState<number>(0)
  const { initialLoading, fetchPageViews } = useConvertLayer()
  useEffect(()=>{
    if(!initialLoading){
      fetchPageViews(uniqStr)
        .then((count)=>setCount(count))
        .finally(()=>setLoading(false))
    }
  },[initialLoading])

  if(initialLoading)return null
  if(loading)return <Loading size={18} />
  return (
    <span {...otherProps}>{count}</span>
  );
}

export default BBSPageViewCore;
