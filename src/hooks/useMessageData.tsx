import React, {useReducer, useRef, useState} from 'react';
import {ReplyInfo} from "../types";
import useDidUpdate from "./useDidUpdate";
import {scrollToEle} from "../utils/index";
import {convertToAtMessage} from "../utils/handlerAtTag";

function useMessageData({offset}) {
    let initialReplyInfo:ReplyInfo={
        at: '',
        rootId: '',
        replyId: '',
    }
    const [replyInfo,replyInfoDispatch] = useReducer(replyInfoReducer, initialReplyInfo)
    const [message,setMessage] = useState('')
    const bbsInputBoxRef=useRef(null)
    const messageEleRef=useRef(null)

    function replyInfoReducer(state:ReplyInfo,action:{type:string,data?:ReplyInfo}):ReplyInfo {
        switch(action.type){
            case 'reply':
                return {
                    at : action.data.at,
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
    useDidUpdate(()=>{
        if (replyInfo.at && replyInfo.replyId) {
            if (!message.startsWith(`@${replyInfo.at} `)) {
                cancelReply()
            }
        }
    },[message])

    function startReply({rootId, replyId, replyName}) {
        replyInfoDispatch({type:'reply',data:{rootId,replyId,at:replyName}})
        let newMessage=convertToAtMessage(message,replyName)
        setMessage(newMessage)
        scrollToEle(bbsInputBoxRef.current, {
            highlight: false,
            smooth: true,
            offset: offset
        }).then(() => {
            messageEleRef.current.getElement().selectionStart = newMessage.length
            messageEleRef.current.getElement().selectionEnd = newMessage.length
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
        message,
        setMessage,
        startReply,
        cancelReply,
        ...replyInfo
    }
}

export default useMessageData;
