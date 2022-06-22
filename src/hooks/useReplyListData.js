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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = require("react");
var useSyncState_1 = __importDefault(require("./useSyncState"));
var clone_deep_1 = __importDefault(require("clone-deep"));
var message_body_module_scss_1 = __importDefault(require("../components/comments/MessageCard/scss/message-body.module.scss"));
var useDidUpdate_1 = __importDefault(require("./useDidUpdate"));
var scrollToEle_1 = __importDefault(require("../utils/DOM/scrollToEle"));
var highLightEle_1 = __importDefault(require("../utils/DOM/highLightEle"));
function useReplyListData(_a) {
    var details = _a.details, curNest = _a.curNest, maxNest = _a.maxNest, loadList = _a.loadList, updateReplyDetails = _a.updateReplyDetails, updateCommentAsync = _a.updateCommentAsync;
    var _b = (0, react_1.useState)(1), replyPage = _b[0], setReplyPage = _b[1];
    var _c = (0, useSyncState_1["default"])([]), replyList = _c[0], syncReplyList = _c[1], setReplyList = _c[2];
    var _d = (0, react_1.useState)(false), nodata = _d[0], setNodata = _d[1];
    var _e = (0, react_1.useState)(details.replyCounts || 0), replyCounts = _e[0], setReplyCounts = _e[1];
    var _f = (0, react_1.useState)(false), replyLoading = _f[0], setReplyLoading = _f[1];
    var _g = (0, react_1.useState)(false), showReply = _g[0], setShowReply = _g[1];
    (0, useDidUpdate_1["default"])(function () {
        if (!updateReplyDetails)
            return;
        var replyId = updateReplyDetails.replyId, rootId = updateReplyDetails.rootId;
        // 不同祖先，彻底没关系
        if (rootId !== (details.rootId || details.objectId))
            return;
        // 已经过了最大嵌套层，不必更新
        if (maxNest === curNest)
            return;
        // 查看replyId和objectId相等时更新
        if (replyId === details.objectId) {
            // console.log(1)
            updateDataAfterReply();
        }
        else if (maxNest === curNest + 1 && syncReplyList.current.find(function (obj) { return obj.objectId === replyId; })) {
            // 下一层是最大嵌套数
            // console.log(2)
            updateDataAfterReply();
        }
    }, [updateReplyDetails]);
    function toggleReplyList() {
        if (showReply) {
            setShowReply(false);
            setReplyList([]);
            return Promise.resolve();
        }
        else {
            setReplyLoading(true);
            setShowReply(true);
            return loadData()["finally"](function () { return setReplyLoading(false); });
        }
    }
    function loadData() {
        var params = {
            replyId: details.objectId,
            page: replyPage,
            deepReply: curNest + 1 === maxNest,
            deepReplyCounts: curNest + 2 >= maxNest
        };
        return loadList(params)
            .then(function (_a) {
            var data = _a.data;
            if (data.length === 0) {
                setNodata(true);
            }
            else {
                setReplyList((0, clone_deep_1["default"])(data));
            }
        });
    }
    function updateCommentInReplyAsync(id, data) {
        var idx = syncReplyList.current.findIndex(function (obj) { return obj.objectId === id; });
        var newReplyList = replyList.slice();
        if (idx !== -1) {
            newReplyList[idx] = __assign(__assign({}, newReplyList[idx]), { message: data.message, updatedAt: data.updatedAt });
            setReplyList(newReplyList);
        }
        else {
            updateCommentAsync(id, data);
        }
    }
    function fetchMore() {
        setReplyPage(replyPage + 1);
        return loadData();
    }
    function updateDataAfterReply() {
        var next;
        if (!showReply) {
            next = toggleReplyList();
        }
        else {
            next = loadData();
        }
        next.then(function () {
            setReplyCounts(replyCounts + 1);
            return (0, scrollToEle_1["default"])(document.getElementById(details.objectId), {
                highlight: false,
                smooth: true
            });
        })
            .then(function () {
            setTimeout(function () {
                var replyId = syncReplyList.current[0].objectId;
                var ele = document.getElementById(replyId).getElementsByClassName(message_body_module_scss_1["default"]['bbs-msg-body'])[0];
                if (!ele)
                    return;
                (0, highLightEle_1["default"])(ele);
            }, 100);
        });
    }
    return {
        replyPage: replyPage,
        replyList: replyList,
        nodata: nodata,
        replyCounts: replyCounts,
        replyLoading: replyLoading,
        showReply: showReply,
        toggleReplyList: toggleReplyList,
        fetchMore: fetchMore,
        updateCommentInReplyAsync: updateCommentInReplyAsync
    };
}
exports["default"] = useReplyListData;
//# sourceMappingURL=useReplyListData.js.map