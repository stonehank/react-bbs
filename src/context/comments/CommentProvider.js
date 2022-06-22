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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var CommentContext_1 = __importDefault(require("./CommentContext"));
var bindATagSmoothScroll_1 = __importDefault(require("../../utils/DOM/bindATagSmoothScroll"));
var clone_deep_1 = __importDefault(require("clone-deep"));
var config_1 = __importDefault(require("../../config"));
var useSyncState_1 = __importDefault(require("../../hooks/useSyncState"));
var useDidUpdate_1 = __importDefault(require("../../hooks/useDidUpdate"));
var readConfig = config_1["default"].readConfig;
var countMap = readConfig().countMap;
function CommentProvider(props) {
    var maxNest = props.maxNest, uniqStr = props.uniqStr, pageSize = props.pageSize, editable = props.editable, startReply = props.startReply, updateComment = props.updateComment, fetchComments = props.fetchComments, fetchCurrentUser = props.fetchCurrentUser;
    var _a = (0, react_1.useState)(true), loading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)(true), userLoading = _b[0], setUserLoading = _b[1];
    var _c = (0, useSyncState_1["default"])(1), page = _c[0], syncPage = _c[1], setPage = _c[2];
    var _d = (0, react_1.useState)([]), list = _d[0], setList = _d[1];
    var _e = (0, react_1.useState)(null), total = _e[0], setTotal = _e[1];
    var _f = (0, react_1.useState)(true), noMoreData = _f[0], setNoMoreData = _f[1];
    var updateReplyDetails = (0, react_1.useRef)(null);
    (0, useDidUpdate_1["default"])(function () {
        reload();
    }, [maxNest, pageSize]);
    (0, react_1.useEffect)(function () {
        /** 流程
         * 获取数据-> 回复
         * 获取数据-> count
         * 根据maxNest，editable, pageSize，分页方式进行渲染
         * */
        init();
        document.addEventListener('click', bindATagSmoothScroll_1["default"]);
        return function () {
            document.removeEventListener('click', bindATagSmoothScroll_1["default"]);
        };
    }, []);
    // 更新list
    function updateList(data) {
        var newList = (0, clone_deep_1["default"])(list);
        newList.unshift(data);
        setList(newList);
        setTotal(total + 1);
    }
    // 更新reply
    function updateReply(_a) {
        var replyId = _a.replyId, rootId = _a.rootId;
        console.log('updateReply', replyId, rootId);
        updateReplyDetails.current = { replyId: replyId, rootId: rootId };
        // setNeedUpdateReply({replyId,rootId})
    }
    function init() {
        setLoading(true);
        setUserLoading(true);
        loadData();
        fetchCurrentUser()["finally"](function () { return setUserLoading(false); });
    }
    function loadData() {
        return loadList({
            page: syncPage.current,
            deepReply: maxNest <= 0,
            deepReplyCounts: maxNest <= 1
        })
            .then(function (_a) {
            var data = _a.data, total = _a.total;
            setList((0, clone_deep_1["default"])(data));
            var newTotal = countMap.has(uniqStr)
                ? countMap.get(uniqStr)
                : total;
            setTotal(newTotal);
            setNoMoreData(data.length >= newTotal);
        })["finally"](function () { return setLoading(false); });
    }
    function reload() {
        if (loading)
            return;
        setPage(1);
        setList([]);
        setLoading(true);
        loadData();
    }
    function loadList(parameters) {
        var params = __assign({ uniqStr: uniqStr, pageSize: +pageSize }, parameters);
        return fetchComments(params);
    }
    function loadMore() {
        setPage(page + 1);
        return loadData();
    }
    function updateCommentAsync(id, updatedData) {
        var data = list.find(function (obj) { return obj.objectId === id; });
        if (data) {
            data.message = updatedData.message;
            data.updatedAt = updatedData.updatedAt;
        }
    }
    return (react_1["default"].createElement(CommentContext_1["default"].Provider, { value: {
            maxNest: maxNest,
            uniqStr: uniqStr,
            pageSize: pageSize,
            editable: editable,
            loading: loading,
            userLoading: userLoading,
            total: total,
            list: list,
            page: page,
            noMoreData: noMoreData,
            updateReplyDetails: updateReplyDetails.current,
            loadMore: loadMore,
            loadList: loadList,
            updateCommentAsync: updateCommentAsync,
            updateList: updateList,
            updateReply: updateReply,
            startReply: startReply,
            updateComment: updateComment
        } }, props.children));
}
// CommentProvider.propTypes={
//     uniqStr: PropTypes.string,
//     pageSize: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number,
//     ]),
//     editable: PropTypes.bool,
//     maxNest: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number,
//     ]),
// }
function propsAreEqual(prevProps, nextProps) {
    // maxNest, uniqStr, pageSize, editable
    return prevProps.maxNest === nextProps.maxNest
        && prevProps.uniqStr === nextProps.uniqStr
        && prevProps.pageSize === nextProps.pageSize
        && prevProps.editable === nextProps.editable;
}
var MemoizedCommentProvider = react_1["default"].memo(CommentProvider, propsAreEqual);
exports["default"] = MemoizedCommentProvider;
