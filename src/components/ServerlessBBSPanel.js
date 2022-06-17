import React, {useRef,useState} from 'react';
import PropTypes from "prop-types";
import '../assets/css/common.scss'
import '../assets/css/highlight.scss'
import '../assets/css/github-markdown.scss'
import panelStyle from '../assets/css/components/serverless-bbs-panel.module.scss'
import Avatar from "./inputs/Avatar";
import useUserInfo from "../hooks/useUserInfo";
import Nickname from "./inputs/Nickname";
import Email from "./inputs/Email";
import MessageInput from "./inputs/MessageInput";
import useHandleReply from "../hooks/useHandleReply";
import ActionsBar from "./actions/ActionsBar";

import Button from "./UI/Button";
import {convertToPureMessage} from "../utils/handlerAtTag";
import useConvertLayer from "../server-layer/leancloud/ConvertLayer";
import CommentContext from "./context/comments/CommentContext";
import CommentProvider from "./context/comments/CommentProvider";
import CommentsList from "./comments/CommentsList";
import Loading from "./UI/Loading";

function ServerlessBBSPanel(props) {
    const {
        initialLoading,
        uploadComment,
    } = useConvertLayer()
    const {
        avatar,
        email,
        nickname,
        setAvatar,
        setEmail,
        setNickname
    } = useUserInfo()
    const {
        bbsInputBoxRef,
        messageEleRef,
        startReply,
        cancelReply,
        message,
        setMessage,
        at,
        rootId,
        replyId,
    } = useHandleReply()
    const {uniqStr,nest,pageSize,offset,editable } = props
    const [submitLoading,setSubmitLoading]=useState(false)
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
            if (!data) {
                return
            }
            reset()
            if (!data.replyId) {
                /* 更新List */
                // updateList()
                // setCommentList([data,...commentList])
                // setCommentTotal(commentTotal + 1)
            } else {
                /* 更新reply */
                // updateReply()
                // setNeedUpdateData({
                //     replyId: data.replyId,
                //     rootId: data.rootId
                // })
                // loadCommentData()
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
                >
                    <CommentsList />
                </CommentProvider>
            </section>
    );
}

ServerlessBBSPanel.propTypes={
    pageSize:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    nest:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    offset:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    uniqStr:PropTypes.string
}

ServerlessBBSPanel.defaultProps={
    editable:true,
    pageSize:5,
    nest:1,
    offset:0,
    uniqStr: window.location.origin + window.location.pathname,
}

export default ServerlessBBSPanel;
