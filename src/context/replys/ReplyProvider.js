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
var CommentContext_1 = __importDefault(require("../comments/CommentContext"));
var clone_deep_1 = __importDefault(require("clone-deep"));
var scrollToEle_1 = __importDefault(require("../../utils/DOM/scrollToEle"));
var message_body_module_scss_1 = __importDefault(require("../../components/comments/MessageCard/scss/message-body.module.scss"));
var highLightEle_1 = __importDefault(require("../../utils/DOM/highLightEle"));
var ReplyContext_1 = __importDefault(require("./ReplyContext"));
var config_1 = __importDefault(require("../../config"));
var useSyncState_1 = __importDefault(require("../../hooks/useSyncState"));
var useDidUpdate_1 = __importDefault(require("../../hooks/useDidUpdate"));
var readLoggedUser = config_1["default"].readLoggedUser;
function ReplyProvider(props) {
    var small = props.small, details = props.details, loadList = props.loadList, updateCommentAsync = props.updateCommentAsync, curNest = props.curNest, maxNest = props.maxNest;
    var _a = (0, react_1.useContext)(CommentContext_1["default"]), startReply = _a.startReply, updateReplyDetails = _a.updateReplyDetails, updateComment = _a.updateComment;
    var editMessageRef = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(details.replyCounts || 0), replyCounts = _b[0], setReplyCounts = _b[1];
    var _c = (0, react_1.useState)(false), replyLoading = _c[0], setReplyLoading = _c[1];
    var _d = (0, react_1.useState)(false), showReply = _d[0], setShowReply = _d[1];
    var _e = (0, useSyncState_1["default"])([]), replyList = _e[0], syncReplyList = _e[1], setReplyList = _e[2];
    var _f = (0, react_1.useState)(1), replyPage = _f[0], setReplyPage = _f[1];
    var _g = (0, react_1.useState)(false), nodata = _g[0], setNodata = _g[1];
    var _h = (0, react_1.useState)(false), edit = _h[0], setEdit = _h[1];
    var _j = (0, react_1.useState)(details.message), editMessage = _j[0], setEditMessage = _j[1];
    function showEdit() {
        setEdit(true);
        setEditMessage(details.message);
    }
    function closeEdit() {
        setEdit(false);
        setEditMessage(details.message);
    }
    var loggedUser = readLoggedUser();
    var canRenderReplyBtn = (0, react_1.useMemo)(function () { return curNest < maxNest; }, [curNest, maxNest]);
    var isOwnerComment = (0, react_1.useMemo)(function () { return loggedUser && loggedUser.id != null && loggedUser.id === details.user_id; }, [loggedUser, details.user_id]);
    (0, useDidUpdate_1["default"])(function () {
        console.log(updateReplyDetails, 'update Reply');
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
    function saveEdit() {
        if (!validate())
            return;
        var id = details.objectId;
        updateComment(id, editMessage)
            .then(function (data) {
            if (!data)
                return;
            closeEdit();
            updateCommentAsync(id, data);
        });
    }
    function updateCommentInReplyAsync(id, data) {
        var replyData = syncReplyList.current.find(function (obj) { return obj.objectId === id; });
        if (replyData) {
            replyData.message = data.message;
            replyData.updatedAt = data.updatedAt;
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
    function insertEmoji(emoji) {
        editMessageRef.current.insertToValue(emoji);
    }
    function validate() {
        return editMessageRef.current.validate();
    }
    return (react_1["default"].createElement(ReplyContext_1["default"].Provider, { value: {
            small: small,
            details: details,
            loadList: loadList,
            updateCommentInReplyAsync: updateCommentInReplyAsync,
            curNest: curNest,
            maxNest: maxNest,
            startReply: startReply,
            replyCounts: replyCounts,
            replyLoading: replyLoading,
            showReply: showReply,
            replyList: replyList,
            replyPage: replyPage,
            nodata: nodata,
            edit: edit,
            editMessage: editMessage,
            setEditMessage: setEditMessage,
            canRenderReplyBtn: canRenderReplyBtn,
            isOwnerComment: isOwnerComment,
            editMessageRef: editMessageRef,
            insertEmoji: insertEmoji,
            showEdit: showEdit,
            closeEdit: closeEdit,
            saveEdit: saveEdit,
            toggleReplyList: toggleReplyList,
            fetchMore: fetchMore
        } }, props.children));
}
exports["default"] = ReplyProvider;
