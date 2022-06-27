import React, {useContext, useMemo, useRef} from 'react';
import messageBodyStyle from './scss/message-body.module.scss'
import clx from 'classnames'
import ReplyListNest from "./body-components/ReplyListNest";
import ReplyListCount from "./body-components/ReplyListCount";
import ReplyActions from "./body-components/ReplyActions";
import ReplyEditRender from "./body-components/ReplyEditRender";
import useReplyEdit from "../../../hooks/useReplyEdit";
import useReplyListData from "../../../hooks/useReplyListData";
import configMethods from '../../../config'
import ReplyUpdateContext from "../../../context/replys/ReplyUpdateContext";
const {readLoggedUser} = configMethods


function MessageBody(props) {

    const {
        small,
        details,
        curNest,
        maxNest,
        loadList,
        updateCommentAsync,
    } = props

    const editMessageRef=useRef(null)
    const {startReply, updateReplyDetails, updateComment}=useContext(ReplyUpdateContext)
    const {
        edit,
        editMessage,
        setEditMessage,
        saveEdit,
        showEdit,
        closeEdit,
    }=useReplyEdit({details, editMessageRef, updateComment, updateCommentAsync})
    const {
        replyList,
        nodata,
        replyCounts,
        replyLoading,
        showReply,
        toggleReplyList,
        fetchMore,
        updateCommentInReplyAsync
    }=useReplyListData({details,curNest,maxNest,loadList,updateReplyDetails,updateCommentAsync})

    const loggedUser = readLoggedUser()
    const canRenderReplyBtn=useMemo(()=>curNest<maxNest,[curNest,maxNest])
    const isOwnerComment=useMemo(()=>loggedUser && loggedUser.id!=null && loggedUser.id===details.user_id,[loggedUser,details.user_id])


    function insertEmoji(emoji) {
        editMessageRef.current.insertToValue(emoji)
    }
    console.log('body render')
    return (
        <div
            className={clx(messageBodyStyle["bbs-msg-wrapper"],{
                [messageBodyStyle["msg-small"]]: small,
            })}
        >
            <ReplyEditRender
                details={details}
                edit={edit}
                small={small}
                editMessage={editMessage}
                setEditMessage={setEditMessage}
                editMessageRef={editMessageRef}
                insertEmoji={insertEmoji}
            />
            <div
                className={clx({
                    [messageBodyStyle["bbs-msg-action"]]: true,
                    [messageBodyStyle["msg-small"]]: small,
                })}
            >
                <ReplyActions
                    details={details}
                    edit={edit}
                    isOwnerComment={isOwnerComment}
                    startReply={startReply}
                    saveEdit={saveEdit}
                    showEdit={showEdit}
                    closeEdit={closeEdit}
                />
                <ReplyListCount
                    canRenderReplyBtn={canRenderReplyBtn}
                    replyCounts={replyCounts}
                    showReply={showReply}
                    toggleReplyList={toggleReplyList}
                />

            </div>
            <ReplyListNest
                showReply={showReply}
                canRenderReplyBtn={canRenderReplyBtn}
                replyLoading={replyLoading}
                curNest={curNest}
                maxNest={maxNest}
                replyList={replyList}
                updateCommentInReplyAsync={updateCommentInReplyAsync}
                loadList={loadList}
                replyCounts={replyCounts}
                // nodata={nodata}
                fetchMore={fetchMore}
            />
        </div>

    );
}

export default MessageBody;

