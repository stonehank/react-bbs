import React,{useContext} from 'react';
import messageBodyStyle from './scss/message-body.module.scss'
import clx from 'classnames'
import PropTypes from 'prop-types'
import MessageInput from "../../inputs/MessageInput";
import ActionsBar from "../../actions/ActionsBar";
import Button from "../../UI/Button";
import MessageRender from "./MessageRender";
import ListRender from "../ListRender";
import Loading from "../../UI/Loading";
import MoreButton from "../MoreButton";
import ReplyContext from "../../../context/replys/ReplyContext";



function MessageBody() {

    const {
        small,
        details,
        loadList,
        updateCommentInReplyAsync,
        curNest,
        maxNest,
        startReply,
        replyCounts,
        replyLoading,
        showReply,
        replyList,
        replyPage,
        nodata,
        edit,
        editMessage,
        setEditMessage,
        canRenderReplyBtn,
        isOwnerComment,
        editMessageRef,

        insertEmoji,
        showEdit,
        closeEdit,
        saveEdit,
        toggleReplyList,
        fetchMore
    } = useContext(ReplyContext)

    return (
        <div
            className={clx(messageBodyStyle["bbs-msg-wrapper"],{
                [messageBodyStyle["msg-small"]]: small,
            })}
        >
            <div
                className={clx(messageBodyStyle["bbs-msg-body"],{
                    [messageBodyStyle["msg-small"]]: small,
                })}
            >
                {!edit
                    ?
                    <MessageRender details={details}/>
                    :
                    <div>
                        <MessageInput
                            message={editMessage}
                            setMessage={setEditMessage}
                            ref={editMessageRef}
                            label={"编辑内容"}
                            rows={3}
                        />
                        <ActionsBar
                            message={editMessage}
                            insertEmoji={insertEmoji}
                            replyId={details.replyId}
                            at={details.at}
                        />
                    </div>
                }

            </div>
            <div
                className={clx({
                    [messageBodyStyle["bbs-msg-action"]]: true,
                    [messageBodyStyle["msg-small"]]: small,
                })}
            >
                {
                    edit && isOwnerComment
                        ?
                        <div className={messageBodyStyle['bbs-msg-action-edit']}>
                            <Button
                                dense
                                text
                                className="mr-4"
                                onClick={closeEdit}
                            >
                                取消
                            </Button>
                            <Button
                                dense
                                text
                                color="success"
                                className="mr-4"
                                onClick={saveEdit}
                            >
                                保存
                            </Button>
                        </div>
                        :
                        <div className={messageBodyStyle['bbs-msg-action-no-edit']}>
                            {
                                isOwnerComment
                                    ?
                                    <Button
                                        dense
                                        text
                                        className="mr-4"
                                        onClick={showEdit}
                                    >
                                        编辑
                                    </Button>
                                    :
                                    null
                            }
                            <Button
                                dense
                                text
                                className="mr-4"
                                color="info"
                                onClick={() => startReply({
                                    rootId: details.rootId || details.objectId,
                                    replyId: details.objectId,
                                    replyName: details.nickname,
                                })}
                            >
                                回复
                            </Button>


                        </div>
                }
                {
                    canRenderReplyBtn
                    &&
                    <span className={messageBodyStyle['bbs-reply-btn']}>
                            {
                                replyCounts > 0 &&
                                <Button dense onClick={toggleReplyList} text>
                                    {
                                        showReply ? <span>收起评论</span> : <span>{replyCounts}条评论</span>
                                    }
                                </Button>
                            }

                        </span>
                }

            </div>
            {
                showReply && canRenderReplyBtn
                &&
                <div>
                    {replyLoading ? <Loading size={32}/> : null}
                    <ListRender
                        className={clx('mt-2', 'pl-1', messageBodyStyle['bbs-reply-wrapper'])}
                        curNest={curNest + 1}
                        maxNest={maxNest}
                        list={replyList}
                        updateCommentAsync={updateCommentInReplyAsync}
                        loadList={loadList}
                    />
                    {
                        !replyLoading && replyCounts > replyList.length
                        &&
                        <MoreButton
                            align={"left"}
                            simple={true}
                            nodata={nodata}
                            loadMore={fetchMore}
                        />
                    }

                </div>
            }
        </div>

    );
}
MessageBody.propTypes={
    small:PropTypes.bool,
    details:PropTypes.object,
    loadList:PropTypes.func,
    updateCommentAsync:PropTypes.func,
    curNest:PropTypes.number,
    maxNest:PropTypes.number,
}

export default MessageBody;
