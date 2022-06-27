import React from 'react';
import messageBodyStyle from "../scss/message-body.module.scss";
import Button from "../../../UI/Button";

type Props={
    canRenderReplyBtn:boolean,
    replyCounts:number,
    showReply:boolean,
    toggleReplyList:()=>void
}

function ReplyListCount({
                            canRenderReplyBtn,
                            replyCounts,
                            showReply,
                            toggleReplyList
}:Props) {
    if(!canRenderReplyBtn)return null
    return (
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
function propsIsEqual(prev,next){
    for(let k in prev){
        if(!prev.hasOwnProperty(k))continue
        if(typeof prev[k]!=='function' && prev[k]!==next[k])return false
    }
    return true
}

export default React.memo(ReplyListCount,propsIsEqual);
