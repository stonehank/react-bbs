"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var ListRender_1 = __importDefault(require("./ListRender"));
var MoreButton_1 = __importDefault(require("./MoreButton"));
var Loading_1 = __importDefault(require("../UI/Loading"));
function CommentsList(props) {
    var maxNest = props.maxNest, loading = props.loading, userLoading = props.userLoading, list = props.list, total = props.total, noMoreData = props.noMoreData, loadMore = props.loadMore, loadList = props.loadList, updateCommentAsync = props.updateCommentAsync;
    if (loading || userLoading) {
        return (react_1["default"].createElement("div", { className: "text-center" },
            react_1["default"].createElement(Loading_1["default"], { size: 48 })));
    }
    console.log('comment list render');
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
}
// function propsIsEqual(prev,next){
//     for(let k in prev){
//         if(!prev.hasOwnProperty(k))continue
//         if(typeof prev[k]!=='function' && prev[k]!==next[k])return false
//     }
//     return true
// }
exports["default"] = react_1["default"].memo(CommentsList);
//# sourceMappingURL=CommentsList.js.map