"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var MessageInput_1 = __importDefault(require("../inputs/MessageInput"));
var ActionsBar_1 = __importDefault(require("../actions/ActionsBar"));
var Button_1 = __importDefault(require("../UI/Button"));
var handlerAtTag_1 = require("../../utils/handlerAtTag");
var ConvertLayer_1 = __importDefault(require("../../server-layer/leancloud/ConvertLayer"));
var ReplyUpdateProvider_1 = __importDefault(require("../../context/replys/ReplyUpdateProvider"));
var CommentsList_1 = __importDefault(require("../comments/CommentsList"));
var Loading_1 = __importDefault(require("../UI/Loading"));
var useUserCacheData_1 = __importDefault(require("../../hooks/useUserCacheData"));
var useMessageData_1 = __importDefault(require("../../hooks/useMessageData"));
var UserInputInfo_1 = __importDefault(require("../inputs/UserInputInfo"));
function BBSPanelCore(_a) {
    var editable = _a.editable, pageSize = _a.pageSize, nest = _a.nest, offset = _a.offset, uniqStr = _a.uniqStr;
    var _b = (0, ConvertLayer_1["default"])(), initialLoading = _b.initialLoading, uploadComment = _b.uploadComment, updateComment = _b.updateComment, fetchComments = _b.fetchComments, fetchCurrentUser = _b.fetchCurrentUser;
    var _c = (0, useUserCacheData_1["default"])(), avatar = _c.avatar, email = _c.email, nickname = _c.nickname, setAvatar = _c.setAvatar, setEmail = _c.setEmail, setNickname = _c.setNickname;
    var _d = (0, useMessageData_1["default"])({ offset: offset }), bbsInputBoxRef = _d.bbsInputBoxRef, messageEleRef = _d.messageEleRef, at = _d.at, rootId = _d.rootId, replyId = _d.replyId, message = _d.message, setMessage = _d.setMessage, startReply = _d.startReply, cancelReply = _d.cancelReply;
    var _e = (0, react_1.useState)(false), submitLoading = _e[0], setSubmitLoading = _e[1];
    var commentListRef = (0, react_1.useRef)(null);
    var nicknameRef = (0, react_1.useRef)(null);
    var emailRef = (0, react_1.useRef)(null);
    function reset() {
        setMessage('');
        cancelReply();
        setTimeout(function () {
            messageEleRef.current.reset();
        }, 0);
    }
    function validate() {
        return nicknameRef.current.validate()
            && emailRef.current.validate()
            && messageEleRef.current.validate();
    }
    function submit() {
        var params = {
            avatar: avatar,
            nickname: nickname,
            email: email,
            message: (0, handlerAtTag_1.convertToPureMessage)(message, at),
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
            console.log(data, 'after reply!!');
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
                console.log('update reply in BBS!!');
                commentListRef.current.updateReply({ replyId: data.replyId, rootId: data.rootId });
            }
        })["finally"](function () {
            setSubmitLoading(false);
        });
    }
    function insertEmoji(emoji) {
        messageEleRef.current.insertToValue(emoji);
    }
    if (initialLoading) {
        return (react_1["default"].createElement("section", { className: "serverless-bbs" },
            react_1["default"].createElement("div", { className: "text-center" },
                react_1["default"].createElement(Loading_1["default"], { size: 64 }))));
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(UserInputInfo_1["default"], { bbsInputBoxRef: bbsInputBoxRef, nicknameRef: nicknameRef, emailRef: emailRef, nickname: nickname, avatar: avatar, email: email, setAvatar: setAvatar, setNickname: setNickname, setEmail: setEmail }),
        react_1["default"].createElement(MessageInput_1["default"], { ref: messageEleRef, message: message, setMessage: setMessage }),
        react_1["default"].createElement(ActionsBar_1["default"], { message: message, replyId: replyId, at: at, insertEmoji: insertEmoji }),
        react_1["default"].createElement("div", { className: "text-right mt-2" },
            react_1["default"].createElement(Button_1["default"], { onClick: submit, loading: submitLoading }, "\u63D0\u4EA4")),
        react_1["default"].createElement(ReplyUpdateProvider_1["default"], { startReply: startReply, updateComment: updateComment },
            react_1["default"].createElement(CommentsList_1["default"], { uniqStr: uniqStr, maxNest: nest, editable: editable, pageSize: pageSize, fetchComments: fetchComments, fetchCurrentUser: fetchCurrentUser, ref: commentListRef }))));
}
exports["default"] = BBSPanelCore;
//# sourceMappingURL=BBSPanelCore.js.map