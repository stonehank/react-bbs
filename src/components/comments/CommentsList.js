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
var CommentContext_1 = __importDefault(require("../../context/comments/CommentContext"));
var ListRender_1 = __importDefault(require("./ListRender"));
var MoreButton_1 = __importDefault(require("./MoreButton"));
var Loading_1 = __importDefault(require("../UI/Loading"));
var ReplyContext_1 = __importDefault(require("../../context/replys/ReplyContext"));
var CommentsList = react_1["default"].forwardRef(function (props, forwardRef) {
    var _a = (0, react_1.useContext)(CommentContext_1["default"]), maxNest = _a.maxNest, uniqStr = _a.uniqStr, pageSize = _a.pageSize, editable = _a.editable, loading = _a.loading, userLoading = _a.userLoading, list = _a.list, page = _a.page, total = _a.total, noMoreData = _a.noMoreData, loadMore = _a.loadMore, loadList = _a.loadList, updateCommentAsync = _a.updateCommentAsync, updateList = _a.updateList;
    var updateReply = (0, react_1.useContext)(ReplyContext_1["default"]).updateReply;
    react_1["default"].useImperativeHandle(forwardRef, function () { return ({
        updateList: updateList,
        updateReply: updateReply
    }); });
    return (loading || userLoading
        ?
            react_1["default"].createElement("div", { className: "text-center" },
                react_1["default"].createElement(Loading_1["default"], { size: 48 }))
        :
            react_1["default"].createElement("section", null,
                react_1["default"].createElement("p", { className: "text-md" },
                    "\u8BC4\u8BBA\u6570\uFF1A",
                    react_1["default"].createElement("span", null, total > 999 ? '999+' : total)),
                react_1["default"].createElement(ListRender_1["default"]
                // define current layer
                , { 
                    // define current layer
                    curNest: 0, maxNest: maxNest, updateCommentAsync: updateCommentAsync, list: list, loadList: loadList }),
                noMoreData && list.length === 0
                    ?
                        react_1["default"].createElement("p", { className: "text-center text-secondary" }, "\u8FD8\u6CA1\u6709\u4EFB\u4F55\u8BC4\u8BBA~")
                    :
                        react_1["default"].createElement(MoreButton_1["default"], { noMoreData: noMoreData, loadMore: loadMore })));
});
exports["default"] = CommentsList;
//# sourceMappingURL=CommentsList.js.map