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
var ListRender_1 = __importDefault(require("./ListRender"));
var MoreButton_1 = __importDefault(require("./MoreButton"));
var Loading_1 = __importDefault(require("../UI/Loading"));
var ReplyUpdateContext_1 = __importDefault(require("../../context/replys/ReplyUpdateContext"));
var useListData_1 = __importDefault(require("../../hooks/useListData"));
var CommentsList = react_1["default"].forwardRef(function (props, forwardRef) {
    var uniqStr = props.uniqStr, maxNest = props.maxNest, editable = props.editable, pageSize = props.pageSize, fetchComments = props.fetchComments, fetchCurrentUser = props.fetchCurrentUser;
    var _a = (0, useListData_1["default"])({ uniqStr: uniqStr, maxNest: maxNest, pageSize: pageSize, fetchComments: fetchComments, fetchCurrentUser: fetchCurrentUser }), loading = _a.loading, userLoading = _a.userLoading, list = _a.list, total = _a.total, noMoreData = _a.noMoreData, loadMore = _a.loadMore, loadList = _a.loadList, updateCommentAsync = _a.updateCommentAsync, updateList = _a.updateList;
    var updateReply = (0, react_1.useContext)(ReplyUpdateContext_1["default"]).updateReply;
    react_1["default"].useImperativeHandle(forwardRef, function () { return ({
        updateList: updateList,
        updateReply: updateReply
    }); });
    if (loading || userLoading) {
        return (react_1["default"].createElement("div", { className: "text-center" },
            react_1["default"].createElement(Loading_1["default"], { size: 48 })));
    }
    return (react_1["default"].createElement("section", null,
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