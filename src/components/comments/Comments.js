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
var CommentsList_1 = __importDefault(require("./CommentsList"));
var ReplyUpdateContext_1 = __importDefault(require("../../context/replys/ReplyUpdateContext"));
var useListData_1 = __importDefault(require("../../hooks/useListData"));
var Comments = react_1["default"].forwardRef(function (_a, commentsRef) {
    var uniqStr = _a.uniqStr, maxNest = _a.maxNest, pageSize = _a.pageSize, fetchComments = _a.fetchComments, fetchCurrentUser = _a.fetchCurrentUser;
    var _b = (0, useListData_1["default"])({ uniqStr: uniqStr, maxNest: maxNest, pageSize: pageSize, fetchComments: fetchComments, fetchCurrentUser: fetchCurrentUser }), loading = _b.loading, userLoading = _b.userLoading, list = _b.list, total = _b.total, noMoreData = _b.noMoreData, loadMore = _b.loadMore, loadList = _b.loadList, updateCommentAsync = _b.updateCommentAsync, updateList = _b.updateList;
    var updateReply = (0, react_1.useContext)(ReplyUpdateContext_1["default"]).updateReply;
    react_1["default"].useImperativeHandle(commentsRef, function () { return ({
        updateList: updateList,
        updateReply: updateReply
    }); });
    return (react_1["default"].createElement(CommentsList_1["default"], { maxNest: maxNest, loading: loading, userLoading: userLoading, list: list, total: total, noMoreData: noMoreData, loadMore: loadMore, loadList: loadList, updateCommentAsync: updateCommentAsync }));
});
exports["default"] = Comments;
//# sourceMappingURL=Comments.js.map