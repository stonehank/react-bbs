"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = require("react");
var useDidUpdate_1 = __importDefault(require("./useDidUpdate"));
var index_1 = require("../utils/index");
var handlerAtTag_1 = require("../utils/handlerAtTag");
function useMessageData(_a) {
    var offset = _a.offset;
    var initialReplyInfo = {
        at: '',
        rootId: '',
        replyId: ''
    };
    var _b = (0, react_1.useReducer)(replyInfoReducer, initialReplyInfo), replyInfo = _b[0], replyInfoDispatch = _b[1];
    var _c = (0, react_1.useState)(''), message = _c[0], setMessage = _c[1];
    var bbsInputBoxRef = (0, react_1.useRef)(null);
    var messageEleRef = (0, react_1.useRef)(null);
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
        }
    }
    (0, useDidUpdate_1["default"])(function () {
        if (replyInfo.at && replyInfo.replyId) {
            if (!message.startsWith("@".concat(replyInfo.at, " "))) {
                cancelReply();
            }
        }
    }, [message]);
    function startReply(_a) {
        var rootId = _a.rootId, replyId = _a.replyId, replyName = _a.replyName;
        replyInfoDispatch({ type: 'reply', data: { rootId: rootId, replyId: replyId, at: replyName } });
        var newMessage = (0, handlerAtTag_1.convertToAtMessage)(message, replyName);
        setMessage(newMessage);
        (0, index_1.scrollToEle)(bbsInputBoxRef.current, {
            highlight: false,
            smooth: true,
            offset: offset
        }).then(function () {
            messageEleRef.current.getElement().selectionStart = newMessage.length;
            messageEleRef.current.getElement().selectionEnd = newMessage.length;
            messageEleRef.current.getElement().focus();
        });
    }
    function cancelReply() {
        setMessage(message.slice(replyInfo.at.length + 1));
        replyInfoDispatch({ type: 'cancel' });
    }
    return __assign({ bbsInputBoxRef: bbsInputBoxRef, messageEleRef: messageEleRef, message: message, setMessage: setMessage, startReply: startReply, cancelReply: cancelReply }, replyInfo);
}
exports["default"] = useMessageData;
//# sourceMappingURL=useMessageData.js.map