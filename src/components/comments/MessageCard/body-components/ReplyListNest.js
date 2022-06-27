import React from 'react';
import Loading from "../../../UI/Loading";
import ListRender from "../../ListRender";
import clx from "classnames";
import messageBodyStyle from "../scss/message-body.module.scss";
import MoreButton from "../../MoreButton";

function ReplyListNest({
                           showReply,
                           canRenderReplyBtn,
                           replyLoading,
                           curNest,
                           maxNest,
                           replyList,
                           replyCounts,
                           // nodata,
                           updateCommentInReplyAsync,
                           loadList,
                           fetchMore
}) {
    if(replyLoading) return <Loading size={32}/>
    if(!showReply || !canRenderReplyBtn)return null
    return (
        <div>
            <ListRender
                className={clx('mt-2', 'pl-1', messageBodyStyle['bbs-reply-wrapper'])}
                curNest={curNest + 1}
                maxNest={maxNest}
                list={replyList}
                updateCommentAsync={updateCommentInReplyAsync}
                loadList={loadList}
            />
            {
                <MoreButton
                    align={"left"}
                    simple={true}
                    noMoreData={replyCounts <= replyList.length}
                    loadMore={fetchMore}
                />
            }

        </div>
    );
}

export default ReplyListNest;
