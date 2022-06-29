import React from 'react';
import messageBodyStyle from '../scss/message-body.module.scss';
import Button from '../../../UI/Button';
function ReplyActions(_a) {
    var details = _a.details, edit = _a.edit, isOwnerComment = _a.isOwnerComment, startReply = _a.startReply, saveEdit = _a.saveEdit, showEdit = _a.showEdit, closeEdit = _a.closeEdit;
    if (edit && isOwnerComment) {
        return (React.createElement("div", { className: messageBodyStyle['bbs-msg-action-edit'] },
            React.createElement(Button, { dense: true, text: true, className: 'mr-4', onClick: closeEdit }, "\u53D6\u6D88"),
            React.createElement(Button, { dense: true, text: true, color: 'success', className: 'mr-4', onClick: saveEdit }, "\u4FDD\u5B58")));
    }
    return (React.createElement("div", { className: messageBodyStyle['bbs-msg-action-no-edit'] },
        isOwnerComment ? (React.createElement(Button, { dense: true, text: true, className: 'mr-4', onClick: showEdit }, "\u7F16\u8F91")) : null,
        React.createElement(Button, { dense: true, text: true, className: 'mr-4', color: 'info', onClick: function () {
                return startReply({
                    rootId: details.rootId || details.objectId,
                    replyId: details.objectId,
                    replyName: details.nickname
                });
            } }, "\u56DE\u590D")));
}
export default React.memo(ReplyActions);
//# sourceMappingURL=ReplyActions.js.map