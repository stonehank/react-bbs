import React, {useContext, useRef, useState} from 'react';
import panelStyle from './bbs-panel-core.module.scss'
import Avatar from "../inputs/Avatar";
import Nickname from "../inputs/Nickname";
import Email from "../inputs/Email";
import MessageInput from "../inputs/MessageInput";
import ActionsBar from "../actions/ActionsBar";
import Button from "../UI/Button";
import {convertToPureMessage} from "../../utils/handlerAtTag";
import useConvertLayer from "../../server-layer/leancloud/ConvertLayer";
import CommentProvider from "../../context/comments/CommentProvider";
import CommentsList from "../comments/CommentsList";
import Loading from "../UI/Loading";
import InputInfoContext from "../../context/input-info/InputInfoContext";
import '../../assets/css/common.scss'
import '../../assets/css/highlight.scss'
import '../../assets/css/github-markdown.scss'

function BBSPanelCore() {
    const {
        initialLoading,
        uploadComment,
        updateComment,
        fetchComments,
        fetchCurrentUser
    } = useConvertLayer()
    const {
        uniqStr,
        nest,
        pageSize,
        editable,
        avatar,
        email,
        nickname,
        setAvatar,
        setEmail,
        setNickname,
        bbsInputBoxRef,
        messageEleRef,
        startReply,
        cancelReply,
        message,
        setMessage,
        at,
        rootId,
        replyId,
    } = useContext(InputInfoContext)

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
        console.log('start reply')
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

    return (
        initialLoading
            ?
            <section className={"serverless-bbs"}>
                <div className={"text-center"}>
                    <Loading size={64} />
                </div>
            </section>
            :
            <section className="serverless-bbs">
                <div className={panelStyle["bbs-input-box"]} >
                    <div className={panelStyle["bbs-name-avatar"] +' ' +panelStyle["bbs-input"]} ref={bbsInputBoxRef}>
                        <Avatar
                            avatar={avatar}
                            setAvatar={setAvatar}
                            email={email}
                            nickname={nickname}
                        />
                        <Nickname
                            style={{flex:1}}
                            ref={nicknameRef}
                            nickname={nickname}
                            setNickname={setNickname}
                        />
                    </div>
                    <div className={panelStyle["bbs-input"]}>
                        <Email
                            ref={emailRef}
                            email={email}
                            setEmail={setEmail}
                        />
                    </div>
                </div>
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
                    <Button onClick={submit}>提交</Button>
                </div>
                <CommentProvider
                    uniqStr={uniqStr}
                    maxNest={nest}
                    editable={editable}
                    pageSize={pageSize}
                    startReply={startReply}
                    updateComment={updateComment}
                    fetchComments={fetchComments}
                    fetchCurrentUser={fetchCurrentUser}
                >
                    <CommentsList ref={commentListRef} />
                </CommentProvider>
            </section>
    );
}

export default BBSPanelCore;
