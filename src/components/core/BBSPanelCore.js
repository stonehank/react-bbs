import React, { useCallback, useRef, useState } from 'react';
import MessageInput from '../inputs/MessageInput';
import ActionsBar from '../actions/ActionsBar';
import { convertToPureMessage } from '../../utils/handlerAtTag';
import Loading from '../UI/Loading';
import useMessageData from '../../hooks/useMessageData';
import UserInputInfo from '../inputs/UserInputInfo';
import ReplyUpdateProvider from '../../context/replys/ReplyUpdateProvider';
import Comments from '../comments/Comments';
import Button from '../UI/Button';
function BBSPanelCore(_a) {
    var editable = _a.editable, pageSize = _a.pageSize, nest = _a.nest, offset = _a.offset, uniqStr = _a.uniqStr, useConvertLayer = _a.useConvertLayer;
    var _b = useState(false), submitLoading = _b[0], setSubmitLoading = _b[1];
    var commentListRef = useRef(null);
    var userInputRef = useRef(null);
    var _c = useConvertLayer(), initialLoading = _c.initialLoading, uploadComment = _c.uploadComment, updateComment = _c.updateComment, fetchComments = _c.fetchComments, fetchCurrentUser = _c.fetchCurrentUser;
    var _d = useMessageData({
        offset: offset,
        userInputRef: userInputRef
    }), messageEleRef = _d.messageEleRef, at = _d.at, rootId = _d.rootId, replyId = _d.replyId, message = _d.message, setMessage = _d.setMessage, startReply = _d.startReply, cancelReply = _d.cancelReply;
    function reset() {
        setMessage('');
        cancelReply();
        setTimeout(function () {
            messageEleRef.current.reset();
        }, 0);
    }
    function validate() {
        return userInputRef.current.validate() && messageEleRef.current.validate();
    }
    var submit = useCallback(function () {
        var params = {
            avatar: userInputRef.current.avatar,
            nickname: userInputRef.current.nickname,
            email: userInputRef.current.email,
            message: convertToPureMessage(message, at),
            rootId: rootId,
            replyId: replyId,
            uniqStr: uniqStr,
            at: at
        };
        if (!validate())
            return;
        setSubmitLoading(true);
        uploadComment(params)
            .then(function (data) {
            if (!data) {
                return;
            }
            reset();
            if (!data.replyId) {
                /* 更新List */
                // updateList()
                commentListRef.current.updateList(data);
            }
            else {
                /* 更新reply */
                // updateReply()
                commentListRef.current.updateReply({
                    replyId: data.replyId,
                    rootId: data.rootId
                });
            }
        })["finally"](function () {
            setSubmitLoading(false);
        });
    }, [message, at, rootId, replyId, uniqStr, at]);
    var insertEmoji = useCallback(function (emoji) {
        messageEleRef.current.insertToValue(emoji);
    }, []);
    if (initialLoading) {
        return (React.createElement("section", { className: 'serverless-bbs' },
            React.createElement("div", { className: 'text-center' },
                React.createElement(Loading, { size: 64 }))));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(UserInputInfo, { ref: userInputRef }),
        React.createElement(MessageInput, { ref: messageEleRef, message: message, setMessage: setMessage }),
        React.createElement(ActionsBar, { message: message, replyId: replyId, at: at, insertEmoji: insertEmoji }),
        React.createElement("div", { className: 'text-right mt-2' },
            React.createElement(Button, { onClick: submit, loading: submitLoading }, "\u63D0\u4EA4")),
        React.createElement(ReplyUpdateProvider, { startReply: startReply, updateComment: updateComment },
            React.createElement(Comments, { uniqStr: uniqStr, maxNest: nest, editable: editable, pageSize: pageSize, fetchComments: fetchComments, fetchCurrentUser: fetchCurrentUser, ref: commentListRef }))));
}
export default BBSPanelCore;
//# sourceMappingURL=BBSPanelCore.js.map