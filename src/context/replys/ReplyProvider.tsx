import React, {useRef} from 'react';
import ReplyContext from "./ReplyContext";

function ReplyProvider({children,startReply,updateComment}) {
    const updateReplyDetails=useRef<{rootId:string,replyId:string} | null>(null)
    // 更新reply
    function updateReply({replyId,rootId}){
        updateReplyDetails.current={replyId,rootId}
    }
    return (
        <ReplyContext.Provider value={{
            startReply,
            updateComment,
            updateReply,
            updateReplyDetails:updateReplyDetails.current
        }}>
            {children}
        </ReplyContext.Provider>
    );
}

export default ReplyProvider;
