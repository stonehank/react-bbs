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
var bbs_panel_core_module_scss_1 = __importDefault(require("./bbs-panel-core.module.scss"));
var Avatar_1 = __importDefault(require("../inputs/Avatar"));
var Nickname_1 = __importDefault(require("../inputs/Nickname"));
var Email_1 = __importDefault(require("../inputs/Email"));
var MessageInput_1 = __importDefault(require("../inputs/MessageInput"));
var ActionsBar_1 = __importDefault(require("../actions/ActionsBar"));
var Button_1 = __importDefault(require("../UI/Button"));
var handlerAtTag_1 = require("../../utils/handlerAtTag");
var ConvertLayer_1 = __importDefault(require("../../server-layer/leancloud/ConvertLayer"));
var CommentProvider_1 = __importDefault(require("../../context/comments/CommentProvider"));
var ReplyProvider_1 = __importDefault(require("../../context/replys/ReplyProvider"));
var CommentsList_1 = __importDefault(require("../comments/CommentsList"));
var Loading_1 = __importDefault(require("../UI/Loading"));
var InputInfoContext_1 = __importDefault(require("../../context/input-info/InputInfoContext"));
require("../../assets/css/common.scss");
require("../../assets/css/highlight.scss");
require("../../assets/css/github-markdown.scss");
function BBSPanelCore() {
    var _a = (0, ConvertLayer_1["default"])(), initialLoading = _a.initialLoading, uploadComment = _a.uploadComment, updateComment = _a.updateComment, fetchComments = _a.fetchComments, fetchCurrentUser = _a.fetchCurrentUser;
    var _b = (0, react_1.useContext)(InputInfoContext_1["default"]), uniqStr = _b.uniqStr, nest = _b.nest, pageSize = _b.pageSize, editable = _b.editable, avatar = _b.avatar, email = _b.email, nickname = _b.nickname, setAvatar = _b.setAvatar, setEmail = _b.setEmail, setNickname = _b.setNickname, bbsInputBoxRef = _b.bbsInputBoxRef, messageEleRef = _b.messageEleRef, startReply = _b.startReply, cancelReply = _b.cancelReply, message = _b.message, setMessage = _b.setMessage, at = _b.at, rootId = _b.rootId, replyId = _b.replyId;
    var _c = (0, react_1.useState)(false), submitLoading = _c[0], setSubmitLoading = _c[1];
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
    return (initialLoading
        ?
            react_1["default"].createElement("section", { className: "serverless-bbs" },
                react_1["default"].createElement("div", { className: "text-center" },
                    react_1["default"].createElement(Loading_1["default"], { size: 64 })))
        :
            react_1["default"].createElement("section", { className: "serverless-bbs" },
                react_1["default"].createElement("div", { className: bbs_panel_core_module_scss_1["default"]["bbs-input-box"] },
                    react_1["default"].createElement("div", { className: bbs_panel_core_module_scss_1["default"]["bbs-name-avatar"] + ' ' + bbs_panel_core_module_scss_1["default"]["bbs-input"], ref: bbsInputBoxRef },
                        react_1["default"].createElement(Avatar_1["default"], { avatar: avatar, setAvatar: setAvatar, email: email, nickname: nickname }),
                        react_1["default"].createElement(Nickname_1["default"], { style: { flex: 1 }, ref: nicknameRef, nickname: nickname, setNickname: setNickname })),
                    react_1["default"].createElement("div", { className: bbs_panel_core_module_scss_1["default"]["bbs-input"] },
                        react_1["default"].createElement(Email_1["default"], { ref: emailRef, email: email, setEmail: setEmail }))),
                react_1["default"].createElement(MessageInput_1["default"], { ref: messageEleRef, message: message, setMessage: setMessage }),
                react_1["default"].createElement(ActionsBar_1["default"], { message: message, replyId: replyId, at: at, insertEmoji: insertEmoji }),
                react_1["default"].createElement("div", { className: "text-right mt-2" },
                    react_1["default"].createElement(Button_1["default"], { onClick: submit }, "\u63D0\u4EA4")),
                react_1["default"].createElement(ReplyProvider_1["default"], { startReply: startReply, updateComment: updateComment },
                    react_1["default"].createElement(CommentProvider_1["default"], { uniqStr: uniqStr, maxNest: nest, editable: editable, pageSize: pageSize, fetchComments: fetchComments, fetchCurrentUser: fetchCurrentUser },
                        react_1["default"].createElement(CommentsList_1["default"], { ref: commentListRef })))));
}
exports["default"] = BBSPanelCore;
//# sourceMappingURL=BBSPanelCore.js.map