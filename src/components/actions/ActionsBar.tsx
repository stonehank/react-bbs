import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import MarkdownIcon from './MarkdownIcon'
import Emoji from '../inputs/Emoji'
import Button from '../UI/Button'
import PreviewRender from './PreviewRender'

const StyledActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledPreviewBtn = styled(Button)`
  padding: 0;
  margin-left: 16px;
`
interface Props {
  message: string;
  replyId: string;
  at: string;
  insertEmoji: (emoji: string) => void;
}
const ActionsBar = ({ message, replyId, at, insertEmoji }: Props) => {
  const [preview, setPreview] = useState(true)
  const [styles, api] = useSpring(() => ({
    from: { scaleY: 0, opacity: 0, dspl: 0 }
  }))
  useEffect(() => {
    api.start({
      scaleY: preview ? 1 : 0,
      opacity: preview ? 1 : 0,
      dspl: preview ? 1 : 0
    })
  }, [preview])
  const togglePreview = useCallback(
    function() {
      setPreview(!preview)
    },
    [preview, setPreview]
  )
  return (
    <>
      <StyledActionBar>
        <MarkdownIcon />
        <div className='text-right'>
          <Emoji onSelect={insertEmoji} />
          <StyledPreviewBtn className='text-sm' text color={preview ? 'success' : ''} onClick={togglePreview}>
            Preview :{preview ? 'On' : 'Off'}
          </StyledPreviewBtn>
        </div>
      </StyledActionBar>
      <animated.div
        style={{
          ...styles,
          transformOrigin: 'top center',
          display: styles.dspl.interpolate((display) => (display === 0 ? 'none' : 'block'))
        }}
      >
        <PreviewRender preview={preview} message={message} replyId={replyId} at={at} />
      </animated.div>
    </>
  )
}

export default React.memo(ActionsBar)
