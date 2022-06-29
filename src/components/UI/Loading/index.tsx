import React from 'react'
import loadingStyle from './loading.module.scss'
function Loading(props) {
  return (
    <div
      className={'serverless-bbs ' + loadingStyle['lds-ring']}
      style={{
        width: props.size,
        height: props.size
      }}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
Loading.defaultProps = {
  size: 64
}

export default Loading
