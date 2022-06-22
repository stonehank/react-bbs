import React from 'react';
import messageBodyStyle from "../scss/message-body.module.scss";
import Button from "../../../UI/Button";

function ReplyListCount({
                            canRenderReplyBtn,
                            replyCounts,
                            showReply,
                            toggleReplyList
}) {
    return (
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
    );
}

export default ReplyListCount;
