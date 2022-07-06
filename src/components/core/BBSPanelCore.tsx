import React, { useCallback, useRef, useState } from 'react'
import MessageInput from '../inputs/MessageInput'
import ActionsBar from '../actions/ActionsBar'
import { convertToPureMessage } from '../../utils/handlerAtTag'
import Loading from '../UI/Loading'
import useMessageData from '../../hooks/useMessageData'
import UserInputInfo from '../inputs/UserInputInfo'
import ReplyUpdateProvider from '../../context/replys/ReplyUpdateProvider'
import Comments from '../comments/Comments'
import Button from '../UI/Button'
import { BBSPanelParams, CommentObject, ConvertLayerIInterface } from '../../types';

interface BBSPanelCoreProps extends BBSPanelParams {
  useConvertLayer: () => ConvertLayerIInterface;
}
type CommentListHandle = React.ElementRef<typeof Comments>;

function BBSPanelCore({ editable, pageSize, nest, offset, uniqStr, useConvertLayer }: BBSPanelCoreProps) {
  const [submitLoading, setSubmitLoading] = useState(false)
  const commentListRef = useRef<CommentListHandle>(null)
  const userInputRef = useRef(null)

  const { initialLoading, uploadComment, updateComment, fetchComments, fetchCurrentUser } = useConvertLayer()

  const { messageEleRef, at, rootId, replyId, message, setMessage, startReply, cancelReply } = useMessageData({
    offset,
    userInputRef
  })

  function reset() {
    setMessage('')
    cancelReply()
    setTimeout(() => {
      messageEleRef.current.reset()
    }, 0)
  }

  function validate(): boolean {
    return userInputRef.current.validate() && messageEleRef.current.validate()
  }

  const submit = useCallback(
    function() {
      const params = {
        avatar: userInputRef.current.avatar,
        nickname: userInputRef.current.nickname,
        email: userInputRef.current.email,
        message: convertToPureMessage(message, at),
        rootId: rootId,
        replyId: replyId,
        uniqStr: uniqStr,
        at: at
      }
      if (!validate()) return
      setSubmitLoading(true)
      uploadComment(params)
        .then((data: CommentObject) => {
          if (!data) {
            return
          }
          reset()
          if (!data.replyId) {
            /* 更新List */
            // updateList()
            commentListRef.current.updateList(data)
          } else {
            /* 更新reply */
            // updateReply()
            commentListRef.current.updateReply({
              replyId: data.replyId,
              rootId: data.rootId
            })
          }
        })
        .finally(() => {
          setSubmitLoading(false)
        })
    },
    [message, at, rootId, replyId, uniqStr, at]
  )

  const insertEmoji = useCallback(function(emoji) {
    messageEleRef.current.insertToValue(emoji)
  }, [])

  if (initialLoading) {
    return (
      <section className='serverless-bbs'>
        <div className='text-center'>
          <Loading size={64} />
        </div>
      </section>
    )
  }
  return (
    <>
      <UserInputInfo ref={userInputRef} />
      <MessageInput ref={messageEleRef} message={message} setMessage={setMessage} />
      <ActionsBar message={message} replyId={replyId} at={at} insertEmoji={insertEmoji} />
      <div className='text-right mt-2'>
        <Button onClick={submit} loading={submitLoading}>
          提交
        </Button>
      </div>
      {/* ReplyUpdateContext can use throughout the list and nested list */}
      <ReplyUpdateProvider startReply={startReply} updateComment={updateComment}>
        <Comments
          uniqStr={uniqStr}
          maxNest={nest}
          editable={editable}
          pageSize={pageSize}
          fetchComments={fetchComments}
          fetchCurrentUser={fetchCurrentUser}
          ref={commentListRef}
        />
      </ReplyUpdateProvider>
    </>
  )
}

export default BBSPanelCore
