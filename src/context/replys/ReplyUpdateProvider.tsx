import React, { useMemo, useRef } from 'react'
import ReplyUpdateContext from './ReplyUpdateContext'
import { CommentObject } from '../../types'

type Props = {
  startReply: ({ rootId, replyId, replyName }: { rootId: any; replyId: any; replyName: any }) => void;
  updateComment: (id: string, message: string) => Promise<CommentObject>;
  [x: string]: any;
}

function ReplyUpdateProvider({ children, startReply, updateComment }: Props) {
  const updateReplyDetails = useRef<{ rootId: string; replyId: string } | null>(null)
  // 更新reply
  function updateReply({ replyId, rootId }) {
    updateReplyDetails.current = { replyId, rootId }
  }
  const value = useMemo(
    () => ({
      startReply,
      updateComment,
      updateReply,
      updateReplyDetails: updateReplyDetails.current
    }),
    [updateReplyDetails.current]
  )
  return <ReplyUpdateContext.Provider value={value}>{children}</ReplyUpdateContext.Provider>
}

export default ReplyUpdateProvider
