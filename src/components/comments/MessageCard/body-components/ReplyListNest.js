import React from 'react';
import Loading from '../../../UI/Loading';
import ListRender from '../../ListRender';
import clx from 'classnames';
import messageBodyStyle from '../scss/message-body.module.scss';
import MoreButton from '../../MoreButton';
function ReplyListNest(_a) {
    var showReply = _a.showReply, canRenderReplyBtn = _a.canRenderReplyBtn, replyLoading = _a.replyLoading, curNest = _a.curNest, maxNest = _a.maxNest, replyList = _a.replyList, replyCounts = _a.replyCounts, 
    // nodata,
    updateCommentInReplyAsync = _a.updateCommentInReplyAsync, loadList = _a.loadList, fetchMore = _a.fetchMore;
    if (replyLoading)
        return React.createElement(Loading, { size: 32 });
    if (!showReply || !canRenderReplyBtn)
        return null;
    return (React.createElement("div", null,
        React.createElement(ListRender, { className: clx('mt-2', 'pl-1', messageBodyStyle['bbs-reply-wrapper']), curNest: curNest + 1, maxNest: maxNest, list: replyList, updateCommentAsync: updateCommentInReplyAsync, loadList: loadList }),
        React.createElement(MoreButton, { align: 'left', simple: true, noMoreData: replyCounts <= replyList.length, loadMore: fetchMore })));
}
export default React.memo(ReplyListNest);
//# sourceMappingURL=ReplyListNest.js.map