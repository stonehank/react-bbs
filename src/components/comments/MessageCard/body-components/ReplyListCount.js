import React from 'react';
import messageBodyStyle from '../scss/message-body.module.scss';
import Button from '../../../UI/Button';
function ReplyListCount(_a) {
    var canRenderReplyBtn = _a.canRenderReplyBtn, replyCounts = _a.replyCounts, showReply = _a.showReply, toggleReplyList = _a.toggleReplyList;
    if (!canRenderReplyBtn)
        return null;
    return (React.createElement("span", { className: messageBodyStyle['bbs-reply-btn'] }, replyCounts > 0 && (React.createElement(Button, { dense: true, onClick: toggleReplyList, text: true }, showReply ? React.createElement("span", null, "\u6536\u8D77\u8BC4\u8BBA") : React.createElement("span", null,
        replyCounts,
        "\u6761\u8BC4\u8BBA")))));
}
export default React.memo(ReplyListCount);
//# sourceMappingURL=ReplyListCount.js.map