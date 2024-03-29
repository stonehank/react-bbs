import { useReducer, useRef, useState } from 'react'
import useDidUpdate from './useDidUpdate'
import { convertToAtMessage } from '../utils/handlerAtTag'
import { ReplyInfo } from '../types'
function replyInfoReducer(state: ReplyInfo, action: { type: string; data?: ReplyInfo }): ReplyInfo {
  switch (action.type) {
    case 'reply':
      return {
        at: action.data.at,
        replyId: action.data.replyId,
        rootId: action.data.rootId
      }
    case 'cancel':
      return {
        at: '',
        replyId: '',
        rootId: ''
      }
    default:
      return state
  }
}
function useMessageData({ offset, userInputRef }) {
  const initialReplyInfo: ReplyInfo = {
    at: '',
    rootId: '',
    replyId: ''
  }
  const [replyInfo, replyInfoDispatch] = useReducer(replyInfoReducer, initialReplyInfo)
  const [message, setMessage] = useState('')
  const messageEleRef = useRef(null)

  function startReply({ rootId, replyId, replyName }) {
    replyInfoDispatch({ type: 'reply', data: { rootId, replyId, at: replyName } })
    const newMessage = convertToAtMessage(message, replyName)
    setMessage(newMessage)
    if (userInputRef.current) {
      userInputRef.current.scrollToMessageInput(offset).then(() => {
        messageEleRef.current.getElement().selectionStart = newMessage.length
        messageEleRef.current.getElement().selectionEnd = newMessage.length
        messageEleRef.current.getElement().focus()
      })
    }
  }
  function cancelReply() {
    setMessage(message.slice(replyInfo.at.length + 1))
    replyInfoDispatch({ type: 'cancel' })
  }
  useDidUpdate(() => {
    if (replyInfo.at && replyInfo.replyId) {
      if (!message.startsWith(`@${replyInfo.at} `)) {
        cancelReply()
      }
    }
  }, [message])
  return {
    messageEleRef,
    message,
    setMessage,
    startReply,
    cancelReply,
    ...replyInfo
  }
}

export default useMessageData
