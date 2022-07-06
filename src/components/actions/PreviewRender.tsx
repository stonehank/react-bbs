import React, { useMemo } from 'react'
import styled from 'styled-components'
import { xssMarkdown } from '../../utils/String'
import { addAtHTMLTag, convertToPureMessage } from '../../utils/handlerAtTag'

const StyledPreviewRender = styled.div`
  padding: 8px;
  font-size: 16px;
  background: var(--bbs-background-color);
  border: 1px dashed var(--bbs-separator-color);
  border-radius: 4px;
`

interface Props {
  preview: boolean;
  message: string;
  replyId: string;
  at: string;
}

function PreviewRender(props: Props) {
  const { message, at, replyId, preview } = props

  if (!preview) return null

  const previewMessage = useMemo(() => addAtHTMLTag(xssMarkdown(convertToPureMessage(message, at)), replyId, at), [
    message,
    at,
    replyId
  ])

  return (
    <StyledPreviewRender
      className='markdown-body'
      dangerouslySetInnerHTML={{
        __html: previewMessage.trim() === '' ? '<span class="text-muted">无内容</span>' : previewMessage
      }}
    />
  )
}

export default PreviewRender
