import React, { useCallback, useMemo, useRef } from 'react';
import ReplyUpdateContext from './ReplyUpdateContext';
function ReplyUpdateProvider(_a) {
    var children = _a.children, startReply = _a.startReply, updateComment = _a.updateComment;
    var updateReplyDetails = useRef(null);
    // 更新reply
    var updateReply = useCallback(function (_a) {
        var replyId = _a.replyId, rootId = _a.rootId;
        updateReplyDetails.current = { replyId: replyId, rootId: rootId };
    }, []);
    var value = useMemo(function () { return ({
        startReply: startReply,
        updateComment: updateComment,
        updateReply: updateReply,
        updateReplyDetails: updateReplyDetails.current
    }); }, [updateReplyDetails.current]);
    return React.createElement(ReplyUpdateContext.Provider, { value: value }, children);
}
export default ReplyUpdateProvider;
//# sourceMappingURL=ReplyUpdateProvider.js.map