import React from 'react'
import BBSPanelCore from './core/BBSPanelCore'
import '../assets/css/common.scss'
import '../assets/css/highlight.scss'
import '../assets/css/github-markdown.scss'
import { BBSPanelParams } from '../types'
import useServerLayer from '../hooks/useServerLayer';

function ServerlessBBSPanel(props: BBSPanelParams) {
  const {loading, useConvertLayer}=useServerLayer()
  if (loading) return null
  return (
    <section className='serverless-bbs'>
      <BBSPanelCore {...props} useConvertLayer={useConvertLayer} />
    </section>
  )
}

ServerlessBBSPanel.defaultProps = {
  pageSize: 5,
  nest: 1,
  offset: 0,
  uniqStr: window.location.origin + window.location.pathname
}

export default React.memo<BBSPanelParams>(ServerlessBBSPanel)
