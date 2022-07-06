import React, { useEffect, useState } from 'react';
import {  ConvertLayerIInterface } from '../../types';
import Loading from '../UI/Loading';
import { readConfig } from '../../config';
type Props =  {
  uniqStr:string,
  useConvertLayer: () => ConvertLayerIInterface;
}
let loopTimer=null
function BBSCounterCore({ uniqStr, useConvertLayer }:Props) {
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
  if(loading)return <Loading />
  return (
    <span>{count}</span>
  );
}

export default BBSCounterCore;
