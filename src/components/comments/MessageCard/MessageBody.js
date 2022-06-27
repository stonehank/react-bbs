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
var message_body_module_scss_1 = __importDefault(require("./scss/message-body.module.scss"));
var classnames_1 = __importDefault(require("classnames"));
var ReplyListNest_1 = __importDefault(require("./body-components/ReplyListNest"));
var ReplyListCount_1 = __importDefault(require("./body-components/ReplyListCount"));
var ReplyActions_1 = __importDefault(require("./body-components/ReplyActions"));
var ReplyEditRender_1 = __importDefault(require("./body-components/ReplyEditRender"));
var useReplyEdit_1 = __importDefault(require("../../../hooks/useReplyEdit"));
var useReplyListData_1 = __importDefault(require("../../../hooks/useReplyListData"));
var config_1 = __importDefault(require("../../../config"));
var ReplyUpdateContext_1 = __importDefault(require("../../../context/replys/ReplyUpdateContext"));
var readLoggedUser = config_1["default"].readLoggedUser;
function MessageBody(props) {
    var _a, _b;
    var small = props.small, details = props.details, curNest = props.curNest, maxNest = props.maxNest, loadList = props.loadList, updateCommentAsync = props.updateCommentAsync;
    var editMessageRef = (0, react_1.useRef)(null);
    var _c = (0, react_1.useContext)(ReplyUpdateContext_1["default"]), startReply = _c.startReply, updateReplyDetails = _c.updateReplyDetails, updateComment = _c.updateComment;
    var _d = (0, useReplyEdit_1["default"])({ details: details, editMessageRef: editMessageRef, updateComment: updateComment, updateCommentAsync: updateCommentAsync }), edit = _d.edit, editMessage = _d.editMessage, setEditMessage = _d.setEditMessage, saveEdit = _d.saveEdit, showEdit = _d.showEdit, closeEdit = _d.closeEdit;
    var _e = (0, useReplyListData_1["default"])({ details: details, curNest: curNest, maxNest: maxNest, loadList: loadList, updateReplyDetails: updateReplyDetails, updateCommentAsync: updateCommentAsync }), replyList = _e.replyList, nodata = _e.nodata, replyCounts = _e.replyCounts, replyLoading = _e.replyLoading, showReply = _e.showReply, toggleReplyList = _e.toggleReplyList, fetchMore = _e.fetchMore, updateCommentInReplyAsync = _e.updateCommentInReplyAsync;
    var loggedUser = readLoggedUser();
    var canRenderReplyBtn = (0, react_1.useMemo)(function () { return curNest < maxNest; }, [curNest, maxNest]);
    var isOwnerComment = (0, react_1.useMemo)(function () { return loggedUser && loggedUser.id != null && loggedUser.id === details.user_id; }, [loggedUser, details.user_id]);
    function insertEmoji(emoji) {
        editMessageRef.current.insertToValue(emoji);
    }
    console.log('body render');
    return (react_1["default"].createElement("div", { className: (0, classnames_1["default"])(message_body_module_scss_1["default"]["bbs-msg-wrapper"], (_a = {},
            _a[message_body_module_scss_1["default"]["msg-small"]] = small,
            _a)) },
        react_1["default"].createElement(ReplyEditRender_1["default"], { details: details, edit: edit, small: small, editMessage: editMessage, setEditMessage: setEditMessage, editMessageRef: editMessageRef, insertEmoji: insertEmoji }),
        react_1["default"].createElement("div", { className: (0, classnames_1["default"])((_b = {},
                _b[message_body_module_scss_1["default"]["bbs-msg-action"]] = true,
                _b[message_body_module_scss_1["default"]["msg-small"]] = small,
                _b)) },
            react_1["default"].createElement(ReplyActions_1["default"], { details: details, edit: edit, isOwnerComment: isOwnerComment, startReply: startReply, saveEdit: saveEdit, showEdit: showEdit, closeEdit: closeEdit }),
            react_1["default"].createElement(ReplyListCount_1["default"], { canRenderReplyBtn: canRenderReplyBtn, replyCounts: replyCounts, showReply: showReply, toggleReplyList: toggleReplyList })),
        react_1["default"].createElement(ReplyListNest_1["default"], { showReply: showReply, canRenderReplyBtn: canRenderReplyBtn, replyLoading: replyLoading, curNest: curNest, maxNest: maxNest, replyList: replyList, updateCommentInReplyAsync: updateCommentInReplyAsync, loadList: loadList, replyCounts: replyCounts, 
            // nodata={nodata}
            fetchMore: fetchMore })));
}
exports["default"] = MessageBody;
//# sourceMappingURL=MessageBody.js.map