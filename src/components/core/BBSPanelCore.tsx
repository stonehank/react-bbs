import React, { useRef, useState} from 'react';
import MessageInput from "../inputs/MessageInput";
import ActionsBar from "../actions/ActionsBar";
import Button from "../UI/Button";
import {convertToPureMessage} from "../../utils/handlerAtTag";
import useConvertLayer from "../../server-layer/leancloud/ConvertLayer";
import ReplyUpdateContext from "../../context/replys/ReplyUpdateProvider";
import CommentsList from "../comments/CommentsList";
import Loading from "../UI/Loading";
import useUserCacheData from "../../hooks/useUserCacheData";
import useMessageData from "../../hooks/useMessageData";
import {BBSPanelParams} from "../../types";
import UserInputInfo from "../inputs/UserInputInfo";


function BBSPanelCore({
                          editable,
                          pageSize,
                          nest,
                          offset,
                          uniqStr,
}:BBSPanelParams) {
    const {
        initialLoading,
        uploadComment,
        updateComment,
        fetchComments,
        fetchCurrentUser
    } = useConvertLayer()

    const {
        avatar,
        email,
        nickname,
        setAvatar,
        setEmail,
        setNickname,
    }=useUserCacheData()

    const {
        bbsInputBoxRef,
        messageEleRef,
        at,
        rootId,
        replyId,
        message,
        setMessage,
        startReply,
        cancelReply,
    }=useMessageData({offset})

    const [submitLoading,setSubmitLoading]=useState(false)
    const commentListRef=useRef(null)
    const nicknameRef=useRef(null)
    const emailRef=useRef(null)

    function reset() {
        setMessage('')
        cancelReply()
        setTimeout(() => {
            messageEleRef.current.reset()
        }, 0)
    }

    function validate() {
        return nicknameRef.current.validate()
            && emailRef.current.validate()
            && messageEleRef.current.validate()
    }

    function submit() {
        let params = {
            avatar: avatar,
            nickname: nickname,
            email: email,
            message: convertToPureMessage(message,at),
            rootId: rootId,
            replyId: replyId,
            uniqStr: uniqStr,
            at: at
        }
        if (!validate()) return
        setSubmitLoading(true)

        uploadComment(params)
            .then((data) => {
                console.log(data,'after reply!!')
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
                    console.log('update reply in BBS!!')
                    commentListRef.current.updateReply({replyId:data.replyId,rootId:data.rootId})
                }
            })
            .finally(() => {
                setSubmitLoading(false)
            })
    }

    function insertEmoji(emoji) {
        messageEleRef.current.insertToValue(emoji)
    }

    if(initialLoading){
        return (
            <section className={"serverless-bbs"}>
                <div className={"text-center"}>
                    <Loading size={64} />
                </div>
            </section>
        )
    }
    return (
        <>
            <UserInputInfo
                bbsInputBoxRef={bbsInputBoxRef}
                nicknameRef={nicknameRef}
                emailRef={emailRef}
                nickname={nickname}
                avatar={avatar}
                email={email}
                setAvatar={setAvatar}
                setNickname={setNickname}
                setEmail={setEmail}
            />
            <MessageInput
                ref={messageEleRef}
                message={message}
                setMessage={setMessage}
            />
            <ActionsBar
                message={message}
                replyId={replyId}
                at={at}
                insertEmoji={insertEmoji}
            />
            <div className="text-right mt-2">
                <Button onClick={submit} loading={submitLoading}>提交</Button>
            </div>
            <ReplyUpdateContext
                startReply={startReply}
                updateComment={updateComment}
            >
                <CommentsList
                    uniqStr={uniqStr}
                    maxNest={nest}
                    editable={editable}
                    pageSize={pageSize}
                    fetchComments={fetchComments}
                    fetchCurrentUser={fetchCurrentUser}
                    ref={commentListRef}
                />
            </ReplyUpdateContext>
        </>
    );
}

export default BBSPanelCore;
