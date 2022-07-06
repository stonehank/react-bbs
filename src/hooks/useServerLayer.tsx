import { useEffect, useRef, useState } from 'react';
import { readConfig } from '../config';
import { ConvertLayerIInterface } from '../types';

function getServerLayer(server) {
  return server === 'leancloud'
    ? import('../server-layer/leancloud/ConvertLayer')
    : import('../server-layer/firebase/ConvertLayer')
}

function useServerLayer() {
  const [loading, setLoading] = useState(true)
  const useConvertLayer = useRef<()=>ConvertLayerIInterface>(null)

  useEffect(() => {
    const { server } = readConfig()
    getServerLayer(server).then((module) => {
      useConvertLayer.current = module.default
      setLoading(false)
    })
  }, [])
  return {loading, useConvertLayer:useConvertLayer.current}
}

export default useServerLayer;
