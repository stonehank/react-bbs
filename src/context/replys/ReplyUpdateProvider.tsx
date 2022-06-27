import React, {useRef} from 'react';
import ReplyUpdateContext from "./ReplyUpdateContext";

function ReplyUpdateProvider({children,startReply,updateComment}) {
    const updateReplyDetails=useRef<{rootId:string,replyId:string} | null>(null)
    // 更新reply
    function updateReply({replyId,rootId}){
        updateReplyDetails.current={replyId,rootId}
    }
    return (
        <ReplyUpdateContext.Provider value={{
            startReply,
            updateComment,
            updateReply,
            updateReplyDetails:updateReplyDetails.current
        }}>
            {children}
        </ReplyUpdateContext.Provider>
    );
}

export default ReplyUpdateProvider;
