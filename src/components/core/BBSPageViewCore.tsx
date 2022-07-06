import React, { useEffect, useState } from 'react';
import {  ConvertLayerIInterface } from '../../types';
import Loading from '../UI/Loading';
type Props =  {
  uniqStr:string,
  useConvertLayer: () => ConvertLayerIInterface;
}
function BBSPageViewCore({ uniqStr, useConvertLayer }:Props) {
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
  if(loading)return <Loading />
  return (
    <span>{count}</span>
  );
}

export default BBSPageViewCore;
