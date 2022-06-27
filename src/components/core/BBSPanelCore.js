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
var handlerAtTag_1 = require("../../utils/handlerAtTag");
var Loading_1 = __importDefault(require("../UI/Loading"));
var useMessageData_1 = __importDefault(require("../../hooks/useMessageData"));
var UserInputInfo_1 = __importDefault(require("../inputs/UserInputInfo"));
var ReplyUpdateProvider_1 = __importDefault(require("../../context/replys/ReplyUpdateProvider"));
var Comments_1 = __importDefault(require("../comments/Comments"));
var Submit_1 = __importDefault(require("../actions/Submit"));
function BBSPanelCore(_a) {
    var editable = _a.editable, pageSize = _a.pageSize, nest = _a.nest, offset = _a.offset, uniqStr = _a.uniqStr, useConvertLayer = _a.useConvertLayer;
    var _b = (0, react_1.useState)(false), submitLoading = _b[0], setSubmitLoading = _b[1];
    var commentListRef = (0, react_1.useRef)(null);
    var userInputRef = (0, react_1.useRef)(null);
    var _c = useConvertLayer(), initialLoading = _c.initialLoading, uploadComment = _c.uploadComment, updateComment = _c.updateComment, fetchComments = _c.fetchComments, fetchCurrentUser = _c.fetchCurrentUser;
    var _d = (0, useMessageData_1["default"])({ offset: offset, userInputRef: userInputRef }), messageEleRef = _d.messageEleRef, at = _d.at, rootId = _d.rootId, replyId = _d.replyId, message = _d.message, setMessage = _d.setMessage, startReply = _d.startReply, cancelReply = _d.cancelReply;
    function reset() {
        setMessage('');
        cancelReply();
        setTimeout(function () {
            messageEleRef.current.reset();
        }, 0);
    }
    function validate() {
        return userInputRef.current.validate()
            && messageEleRef.current.validate();
    }
    function submit() {
        var params = {
            avatar: userInputRef.current.avatar,
            nickname: userInputRef.current.nickname,
            email: userInputRef.current.email,
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
        react_1["default"].createElement(UserInputInfo_1["default"], { ref: userInputRef }),
        react_1["default"].createElement(MessageInput_1["default"], { ref: messageEleRef, message: message, setMessage: setMessage }),
        react_1["default"].createElement(ActionsBar_1["default"], { message: message, replyId: replyId, at: at, insertEmoji: insertEmoji }),
        react_1["default"].createElement(Submit_1["default"], { submit: submit, submitLoading: submitLoading }),
        react_1["default"].createElement(ReplyUpdateProvider_1["default"], { startReply: startReply, updateComment: updateComment },
            react_1["default"].createElement(Comments_1["default"], { uniqStr: uniqStr, maxNest: nest, editable: editable, pageSize: pageSize, fetchComments: fetchComments, fetchCurrentUser: fetchCurrentUser, ref: commentListRef }))));
}
exports["default"] = BBSPanelCore;
//# sourceMappingURL=BBSPanelCore.js.map