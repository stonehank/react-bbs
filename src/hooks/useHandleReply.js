import {convertToAtMessage} from "../utils/handlerAtTag";
import {scrollToEle} from "../utils/DOM";
import {useRef, useEffect, useReducer, useState} from "react";


export default function useHandleReply(offset=0){
    const bbsInputBoxRef=useRef(null)
    const messageEleRef=useRef(null)
    const [message,setMessage] = useState('')
    let initialReplyInfo={
        at: '',
        rootId: '',
        replyId: '',
    }
    const [replyInfo,replyInfoDispatch] = useReducer(replyInfoReducer, initialReplyInfo)

    function replyInfoReducer(state,action) {
        switch(action.type){
            case 'reply':
                return {
                    at : action.data.replyName,
                    replyId : action.data.replyId,
                    rootId : action.data.rootId,
                }
            case 'cancel':
                return {
                    at : '',
                    replyId : '',
                    rootId : '',
                }
        }
    }
    useEffect(()=>{
        if (replyInfo.at && replyInfo.replyId) {
            if (!replyInfo.message.startsWith(`@${replyInfo.at} `)) {
                cancelReply()
            }
        }
    },[message])

    function startReply({rootId, replyId, replyName}) {
        replyInfoDispatch({type:'reply',data:{rootId,replyId,replyName}})
        setMessage(convertToAtMessage(message,replyName))
        scrollToEle(bbsInputBoxRef.current, {
            highlight: false,
            smooth: true,
            offset: offset
        }).then(() => {
            messageEleRef.current.getElement().selectionStart = message.length
            messageEleRef.current.getElement().selectionEnd = message.length
            messageEleRef.current.getElement().focus()
        })
    }
    function cancelReply() {
        setMessage(message.slice(replyInfo.at.length + 1))
        replyInfoDispatch({type:'cancel'})
    }

    return {
        bbsInputBoxRef,
        messageEleRef,
        startReply,
        cancelReply,
        message,
        setMessage,
        ...replyInfo
    }
}
