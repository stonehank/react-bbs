import React from 'react';
import ListRender from './ListRender';
import MoreButton from './MoreButton';
import Loading from '../UI/Loading';
function CommentsList(props) {
    var maxNest = props.maxNest, loading = props.loading, userLoading = props.userLoading, list = props.list, total = props.total, noMoreData = props.noMoreData, loadMore = props.loadMore, loadList = props.loadList, updateCommentAsync = props.updateCommentAsync;
    if (loading || userLoading) {
        return (React.createElement("div", { className: 'text-center' },
            React.createElement(Loading, { size: 48 })));
    }
    return (React.createElement("section", null,
        React.createElement("p", { className: 'text-md' },
            "\u8BC4\u8BBA\u6570\uFF1A",
            React.createElement("span", null, total > 999 ? '999+' : total)),
        React.createElement(ListRender
        // define current layer
        , { 
            // define current layer
            curNest: 0, maxNest: maxNest, updateCommentAsync: updateCommentAsync, list: list, loadList: loadList }),
        noMoreData && list.length === 0 ? (React.createElement("p", { className: 'text-center text-secondary' }, "\u8FD8\u6CA1\u6709\u4EFB\u4F55\u8BC4\u8BBA~")) : (React.createElement(MoreButton, { noMoreData: noMoreData, loadMore: loadMore }))));
}
export default React.memo(CommentsList);
//# sourceMappingURL=CommentsList.js.map