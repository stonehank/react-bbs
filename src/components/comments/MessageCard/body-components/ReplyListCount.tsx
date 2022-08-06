import React from 'react'
import messageBodyStyle from '../scss/message-body.module.scss'
import Button from '../../../UI/Button'

type Props = {
  canRenderReplyBtn: boolean;
  replyCounts: number;
  showReply: boolean;
  toggleReplyList: () => void;
}

function ReplyListCount({ canRenderReplyBtn, replyCounts, showReply, toggleReplyList }: Props) {
  if (!canRenderReplyBtn) return null
  return (
    <span className={messageBodyStyle['bbs-reply-btn']}>
      {replyCounts > 0 && (
        <Button dense onClick={toggleReplyList} text>
          {showReply ? <span>Collapse</span> : <span className='letter-space-0'><b>{replyCounts}</b> Comments</span>}
        </Button>
      )}
    </span>
  )
}

export default React.memo(ReplyListCount)
