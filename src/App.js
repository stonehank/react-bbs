import React from 'react'
import useConvertLayer from './layer/leancloud/ConvertLayer'

export default function App() {
  const {initialLoading} = useConvertLayer()

  return (
      initialLoading ? <h1>Loading...</h1> : <h1>DONE</h1>
  )
}
