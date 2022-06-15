import React from 'react'
import useConvertLayer from './server-layer/leancloud/ConvertLayer'
import ServerlessBbs from "./components/ServerlessBBS";
import ServerlessBBSPanel from "./components/ServerlessBBSPanel";

export default function App() {
  const {initialLoading} = useConvertLayer()

  return (
      initialLoading ? <h1>Loading...</h1> : <ServerlessBBSPanel />
  )
}
