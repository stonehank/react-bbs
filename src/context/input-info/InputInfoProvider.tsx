import React, { useReducer, useRef, useState} from 'react';
import InputInfoContext from "./InputInfoContext";
import {getFromCache, scrollToEle, setCache} from "../../utils/index";
import {convertToAtMessage} from "../../utils/handlerAtTag";
import useDidUpdate from '../../hooks/useDidUpdate'
import {CACHE_KEY} from "../../constant";
import {ConfigInfo, UserInfo, ReplyInfo} from "../../types";



function InputInfoProvider(props:ConfigInfo & {children:any}) {
    const {children,offset,...otherProps} = props

    let cacheData = getCacheData(CACHE_KEY)
    const bbsInputBoxRef=useRef(null)
    const messageEleRef=useRef(null)
    const [message,setMessage] = useState('')
    const initialUserInfo:UserInfo={
        avatar: cacheData.avatar,
        nickname: cacheData.nickname,
        email: cacheData.email,
    }
    let initialReplyInfo:ReplyInfo={
        at: '',
        rootId: '',
        replyId: '',
    }
    const [userInfo,userInfoDispatch] = useReducer(userInfoReducer,initialUserInfo)
    const [replyInfo,replyInfoDispatch] = useReducer(replyInfoReducer, initialReplyInfo)

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

    function userInfoReducer(state:UserInfo,action:{type:string,value:string}):UserInfo{
        switch(action.type){
            case 'nickname':
                return {
                    ...state,
                    nickname: action.value
                }
            case 'avatar':
                return {
                    ...state,
                    avatar: action.value
                }
            case 'email':
                return {
                    ...state,
                    email:action.value
                }
            default:
                return state
        }
    }
    useDidUpdate(()=>{
        setCache(CACHE_KEY, userInfo)
    },[userInfo])

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

    function setAvatar(avatar){
        return userInfoDispatch({type:'avatar',value:avatar})
    }
    function setEmail(email){
        return userInfoDispatch({type:'email',value:email})
    }
    function setNickname(nickname){
        return userInfoDispatch({type:'nickname',value:nickname})
    }

    function getCacheData(CACHE_KEY) {
        let cacheData = getFromCache(CACHE_KEY)
        if (cacheData == null) {
            cacheData = {
                nickname: '',
                email: '',
                avatar: ''
            }
        }
        return cacheData
    }


    return (
        <InputInfoContext.Provider value={{
            bbsInputBoxRef,
            messageEleRef,
            message,
            setMessage,
            startReply,
            cancelReply,
            setAvatar,
            setEmail,
            setNickname,
            ...otherProps,
            ...userInfo,
            ...replyInfo
        }}>
            {props.children}
        </InputInfoContext.Provider>
    );
}

function propsAreEqual(prevProps, nextProps) {
    // uniqStr,nest,pageSize,offset,editable
    return prevProps.nest === nextProps.nest
        && prevProps.uniqStr === nextProps.uniqStr
        && prevProps.pageSize === nextProps.pageSize
        && prevProps.editable === nextProps.editable
        && prevProps.offset === nextProps.offset
}
const MemoizedInfoProvider = React.memo(InputInfoProvider, propsAreEqual);

export default MemoizedInfoProvider;

