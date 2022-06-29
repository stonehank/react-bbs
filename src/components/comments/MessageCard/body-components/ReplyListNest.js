"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var Loading_1 = __importDefault(require("../../../UI/Loading"));
var ListRender_1 = __importDefault(require("../../ListRender"));
var classnames_1 = __importDefault(require("classnames"));
var message_body_module_scss_1 = __importDefault(require("../scss/message-body.module.scss"));
var MoreButton_1 = __importDefault(require("../../MoreButton"));
function ReplyListNest(_a) {
    var showReply = _a.showReply, canRenderReplyBtn = _a.canRenderReplyBtn, replyLoading = _a.replyLoading, curNest = _a.curNest, maxNest = _a.maxNest, replyList = _a.replyList, replyCounts = _a.replyCounts, 
    // nodata,
    updateCommentInReplyAsync = _a.updateCommentInReplyAsync, loadList = _a.loadList, fetchMore = _a.fetchMore;
    if (replyLoading)
        return react_1["default"].createElement(Loading_1["default"], { size: 32 });
    if (!showReply || !canRenderReplyBtn)
        return null;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(ListRender_1["default"], { className: (0, classnames_1["default"])('mt-2', 'pl-1', message_body_module_scss_1["default"]['bbs-reply-wrapper']), curNest: curNest + 1, maxNest: maxNest, list: replyList, updateCommentAsync: updateCommentInReplyAsync, loadList: loadList }),
        react_1["default"].createElement(MoreButton_1["default"], { align: "left", simple: true, noMoreData: replyCounts <= replyList.length, loadMore: fetchMore })));
}
exports["default"] = react_1["default"].memo(ReplyListNest);
//# sourceMappingURL=ReplyListNest.js.map