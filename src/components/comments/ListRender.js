import React from 'react';
import MessageCard from './MessageCard';
function ListRender(props) {
    var curNest = props.curNest, list = props.list, maxNest = props.maxNest, updateCommentAsync = props.updateCommentAsync, loadList = props.loadList;
    return (React.createElement("section", null, list.map(function (details, index) { return (React.createElement(MessageCard, { key: details.objectId, index: index, small: curNest > 0, details: details, curNest: curNest, maxNest: maxNest, updateCommentAsync: updateCommentAsync, loadList: loadList })); })));
}
export default React.memo(ListRender);
//# sourceMappingURL=ListRender.js.map