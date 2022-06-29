import React from 'react';
import clx from 'classnames';
import messageBodyStyle from '../scss/message-body.module.scss';
import MessageRender from '../MessageRender';
import MessageInput from '../../../inputs/MessageInput';
import ActionsBar from '../../../actions/ActionsBar';
function ReplyEditRender(_a) {
    var _b;
    var details = _a.details, edit = _a.edit, small = _a.small, editMessage = _a.editMessage, setEditMessage = _a.setEditMessage, editMessageRef = _a.editMessageRef, insertEmoji = _a.insertEmoji;
    return (React.createElement("div", { className: clx(messageBodyStyle['bbs-msg-body'], (_b = {},
            _b[messageBodyStyle['msg-small']] = small,
            _b)) }, !edit ? (React.createElement(MessageRender, { details: details })) : (React.createElement("div", null,
        React.createElement(MessageInput, { message: editMessage, setMessage: setEditMessage, ref: editMessageRef, label: '\u7F16\u8F91\u5185\u5BB9', rows: 3 }),
        React.createElement(ActionsBar, { message: editMessage, insertEmoji: insertEmoji, replyId: details.replyId, at: details.at })))));
}
export default React.memo(ReplyEditRender);
//# sourceMappingURL=ReplyEditRender.js.map