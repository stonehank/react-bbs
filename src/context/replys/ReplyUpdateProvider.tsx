import React, { useCallback, useMemo, useRef } from 'react';
import ReplyUpdateContext from './ReplyUpdateContext'
import { CommentObject } from '../../types'

interface Props  {
  startReply: ({ rootId, replyId, replyName }: { rootId: any; replyId: any; replyName: any }) => void;
  updateComment: (id: string, message: string) => Promise<CommentObject>;
  [x: string]: any;
}
export type UpdateReply=({replyId,rootId}:{ replyId:string, rootId:string })=>void
function ReplyUpdateProvider({ children, startReply, updateComment }: Props) {
  const updateReplyDetails = useRef<{ rootId: string; replyId: string } | null>(null)

  // 更新reply
  const updateReply=useCallback<UpdateReply>(function({ replyId, rootId }) {
    updateReplyDetails.current = { replyId, rootId }
  },[])

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
