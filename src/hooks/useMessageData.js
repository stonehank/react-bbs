var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useReducer, useRef, useState } from 'react';
import useDidUpdate from './useDidUpdate';
import { convertToAtMessage } from '../utils/handlerAtTag';
function replyInfoReducer(state, action) {
    switch (action.type) {
        case 'reply':
            return {
                at: action.data.at,
                replyId: action.data.replyId,
                rootId: action.data.rootId
            };
        case 'cancel':
            return {
                at: '',
                replyId: '',
                rootId: ''
            };
        default:
            return state;
    }
}
function useMessageData(_a) {
    var offset = _a.offset, userInputRef = _a.userInputRef;
    var initialReplyInfo = {
        at: '',
        rootId: '',
        replyId: ''
    };
    var _b = useReducer(replyInfoReducer, initialReplyInfo), replyInfo = _b[0], replyInfoDispatch = _b[1];
    var _c = useState(''), message = _c[0], setMessage = _c[1];
    var messageEleRef = useRef(null);
    function startReply(_a) {
        var rootId = _a.rootId, replyId = _a.replyId, replyName = _a.replyName;
        replyInfoDispatch({ type: 'reply', data: { rootId: rootId, replyId: replyId, at: replyName } });
        var newMessage = convertToAtMessage(message, replyName);
        setMessage(newMessage);
        if (userInputRef.current) {
            userInputRef.current.scrollToMessageInput(offset).then(function () {
                messageEleRef.current.getElement().selectionStart = newMessage.length;
                messageEleRef.current.getElement().selectionEnd = newMessage.length;
                messageEleRef.current.getElement().focus();
            });
        }
    }
    function cancelReply() {
        setMessage(message.slice(replyInfo.at.length + 1));
        replyInfoDispatch({ type: 'cancel' });
    }
    useDidUpdate(function () {
        if (replyInfo.at && replyInfo.replyId) {
            if (!message.startsWith("@".concat(replyInfo.at, " "))) {
                cancelReply();
            }
        }
    }, [message]);
    return __assign({ messageEleRef: messageEleRef, message: message, setMessage: setMessage, startReply: startReply, cancelReply: cancelReply }, replyInfo);
}
export default useMessageData;
//# sourceMappingURL=useMessageData.js.map