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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var InputInfoContext_1 = __importDefault(require("./InputInfoContext"));
var index_1 = require("../../utils/index");
var handlerAtTag_1 = require("../../utils/handlerAtTag");
var useDidUpdate_1 = __importDefault(require("../../hooks/useDidUpdate"));
var constant_1 = require("../../constant");
function InputInfoProvider(props) {
    var children = props.children, offset = props.offset, otherProps = __rest(props, ["children", "offset"]);
    var cacheData = getCacheData(constant_1.CACHE_KEY);
    var bbsInputBoxRef = (0, react_1.useRef)(null);
    var messageEleRef = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(''), message = _a[0], setMessage = _a[1];
    var initialUserInfo = {
        avatar: cacheData.avatar,
        nickname: cacheData.nickname,
        email: cacheData.email
    };
    var initialReplyInfo = {
        at: '',
        rootId: '',
        replyId: ''
    };
    var _b = (0, react_1.useReducer)(userInfoReducer, initialUserInfo), userInfo = _b[0], userInfoDispatch = _b[1];
    var _c = (0, react_1.useReducer)(replyInfoReducer, initialReplyInfo), replyInfo = _c[0], replyInfoDispatch = _c[1];
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
    function userInfoReducer(state, action) {
        switch (action.type) {
            case 'nickname':
                return __assign(__assign({}, state), { nickname: action.value });
            case 'avatar':
                return __assign(__assign({}, state), { avatar: action.value });
            case 'email':
                return __assign(__assign({}, state), { email: action.value });
            default:
                return state;
        }
    }
    (0, useDidUpdate_1["default"])(function () {
        (0, index_1.setCache)(constant_1.CACHE_KEY, userInfo);
    }, [userInfo]);
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
    function setAvatar(avatar) {
        return userInfoDispatch({ type: 'avatar', value: avatar });
    }
    function setEmail(email) {
        return userInfoDispatch({ type: 'email', value: email });
    }
    function setNickname(nickname) {
        return userInfoDispatch({ type: 'nickname', value: nickname });
    }
    function getCacheData(CACHE_KEY) {
        var cacheData = (0, index_1.getFromCache)(CACHE_KEY);
        if (cacheData == null) {
            cacheData = {
                nickname: '',
                email: '',
                avatar: ''
            };
        }
        return cacheData;
    }
    return (react_1["default"].createElement(InputInfoContext_1["default"].Provider, { value: __assign(__assign(__assign({ bbsInputBoxRef: bbsInputBoxRef, messageEleRef: messageEleRef, message: message, setMessage: setMessage, startReply: startReply, cancelReply: cancelReply, setAvatar: setAvatar, setEmail: setEmail, setNickname: setNickname }, otherProps), userInfo), replyInfo) }, props.children));
}
function propsAreEqual(prevProps, nextProps) {
    // uniqStr,nest,pageSize,offset,editable
    return prevProps.nest === nextProps.nest
        && prevProps.uniqStr === nextProps.uniqStr
        && prevProps.pageSize === nextProps.pageSize
        && prevProps.editable === nextProps.editable
        && prevProps.offset === nextProps.offset;
}
var MemoizedInfoProvider = react_1["default"].memo(InputInfoProvider, propsAreEqual);
exports["default"] = MemoizedInfoProvider;
//# sourceMappingURL=InputInfoProvider.js.map