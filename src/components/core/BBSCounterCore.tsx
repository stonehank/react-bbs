import React, { useEffect, useState } from 'react';
import {  ConvertLayerIInterface } from '../../types';
import Loading from '../UI/Loading';
import { readConfig } from '../../config';
interface CounterProps extends React.HTMLAttributes<HTMLSpanElement>{
  uniqStr:string,
  useConvertLayer: () => ConvertLayerIInterface;
}
let loopTimer=null
function BBSCounterCore({ uniqStr, useConvertLayer, ...otherProps }:CounterProps) {
  const {countMap} = readConfig()
  const [loading, setLoading]=useState<boolean>(true)
  const [count, setCount]=useState<number>(0)
  const { initialLoading, fetchCounts } = useConvertLayer()
  useEffect(()=>{
    if(!initialLoading){
      fetchCounts(uniqStr)
        .then((count)=>setCount(count))
        .finally(()=>setLoading(false))
    }
    loopTimer=setInterval(()=>{
      setCount(countMap.get(uniqStr))
    },1000)
    return ()=>{
      clearInterval(loopTimer)
    }
  },[initialLoading])

  if(initialLoading)return null
  if(loading)return <Loading size={18} />
  return (
    <span {...otherProps} >{count}</span>
  );
}

export default BBSCounterCore;
