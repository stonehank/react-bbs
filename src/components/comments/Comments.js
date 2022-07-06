import React, { useContext } from 'react';
import CommentsList from './CommentsList';
import ReplyUpdateContext from '../../context/replys/ReplyUpdateContext';
import useListData from '../../hooks/useListData';
var Comments = function (_a, commentsRef) {
    var uniqStr = _a.uniqStr, maxNest = _a.maxNest, pageSize = _a.pageSize, fetchComments = _a.fetchComments, fetchCurrentUser = _a.fetchCurrentUser;
    var _b = useListData({
        uniqStr: uniqStr,
        maxNest: maxNest,
        pageSize: pageSize,
        fetchComments: fetchComments,
        fetchCurrentUser: fetchCurrentUser
    }), loading = _b.loading, userLoading = _b.userLoading, list = _b.list, total = _b.total, noMoreData = _b.noMoreData, loadMore = _b.loadMore, loadList = _b.loadList, updateCommentAsync = _b.updateCommentAsync, updateList = _b.updateList;
    var updateReply = useContext(ReplyUpdateContext).updateReply;
    React.useImperativeHandle(commentsRef, function () { return ({
        updateList: updateList,
        updateReply: updateReply
    }); });
    return (React.createElement(CommentsList, { maxNest: maxNest, loading: loading, userLoading: userLoading, list: list, total: total, noMoreData: noMoreData, loadMore: loadMore, loadList: loadList, updateCommentAsync: updateCommentAsync }));
};
export default React.forwardRef(Comments);
//# sourceMappingURL=Comments.js.map