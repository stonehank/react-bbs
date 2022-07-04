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
import { useCallback, useRef, useState } from 'react';
import useSyncState from './useSyncState';
import cloneDeep from 'clone-deep';
import messageBodyStyle from '../components/comments/MessageCard/scss/message-body.module.scss';
import useDidUpdate from './useDidUpdate';
import scrollToEle from '../utils/DOM/scrollToEle';
import highLightEle from '../utils/DOM/highLightEle';
function useReplyListData(_a) {
    var details = _a.details, curNest = _a.curNest, maxNest = _a.maxNest, loadList = _a.loadList, updateReplyDetails = _a.updateReplyDetails, updateCommentAsync = _a.updateCommentAsync;
    var _b = useSyncState([]), replyList = _b[0], syncReplyList = _b[1], setReplyList = _b[2];
    var _c = useState(false), nodata = _c[0], setNodata = _c[1];
    var _d = useState(details.replyCounts || 0), replyCounts = _d[0], setReplyCounts = _d[1];
    var _e = useState(false), replyLoading = _e[0], setReplyLoading = _e[1];
    var _f = useState(false), showReply = _f[0], setShowReply = _f[1];
    var replyPage = useRef(1);
    function loadData() {
        var params = {
            replyId: details.objectId,
            page: replyPage.current,
            deepReply: curNest + 1 === maxNest,
            deepReplyCounts: curNest + 2 >= maxNest
        };
        return loadList(params).then(function (_a) {
            var data = _a.data;
            if (data.length === 0) {
                setNodata(true);
            }
            else {
                setReplyList(cloneDeep(data));
            }
        });
    }
    var toggleReplyList = useCallback(function () {
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
    }, [showReply]);
    var updateCommentInReplyAsync = useCallback(function (id, data) {
        var idx = syncReplyList.current.findIndex(function (obj) { return obj.objectId === id; });
        var newReplyList = replyList.slice();
        if (idx !== -1) {
            newReplyList[idx] = __assign(__assign({}, newReplyList[idx]), { message: data.message, updatedAt: data.updatedAt });
            setReplyList(newReplyList);
        }
        else {
            updateCommentAsync(id, data);
        }
    }, [replyList]);
    var fetchMore = useCallback(function () {
        replyPage.current += 1;
        return loadData();
    }, []);
    function updateDataAfterReply() {
        var next;
        if (!showReply) {
            next = toggleReplyList();
        }
        else {
            next = loadData();
        }
        next
            .then(function () {
            setReplyCounts(replyCounts + 1);
            return scrollToEle(document.getElementById(details.objectId), {
                highlight: false,
                smooth: true
            });
        })
            .then(function () {
            setTimeout(function () {
                var replyId = syncReplyList.current[0].objectId;
                var ele = document.getElementById(replyId).getElementsByClassName(messageBodyStyle['bbs-msg-body'])[0];
                if (!ele)
                    return;
                highLightEle(ele);
            }, 100);
        });
    }
    useDidUpdate(function () {
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
            updateDataAfterReply();
        }
        else if (maxNest === curNest + 1 && syncReplyList.current.find(function (obj) { return obj.objectId === replyId; })) {
            // 下一层是最大嵌套数
            updateDataAfterReply();
        }
    }, [updateReplyDetails]);
    return {
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
export default useReplyListData;
//# sourceMappingURL=useReplyListData.js.map