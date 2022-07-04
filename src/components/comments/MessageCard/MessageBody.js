import React, { useCallback, useContext, useMemo, useRef } from 'react';
import messageBodyStyle from './scss/message-body.module.scss';
import clx from 'classnames';
import ReplyListNest from './body-components/ReplyListNest';
import ReplyListCount from './body-components/ReplyListCount';
import ReplyActions from './body-components/ReplyActions';
import ReplyEditRender from './body-components/ReplyEditRender';
import useReplyEdit from '../../../hooks/useReplyEdit';
import useReplyListData from '../../../hooks/useReplyListData';
import { readLoggedUser } from '../../../config';
import ReplyUpdateContext from '../../../context/replys/ReplyUpdateContext';
function MessageBody(props) {
    var _a, _b;
    var small = props.small, details = props.details, curNest = props.curNest, maxNest = props.maxNest, loadList = props.loadList, updateCommentAsync = props.updateCommentAsync;
    var editMessageRef = useRef(null);
    var _c = useContext(ReplyUpdateContext), startReply = _c.startReply, updateReplyDetails = _c.updateReplyDetails, updateComment = _c.updateComment;
    var _d = useReplyEdit({
        details: details,
        editMessageRef: editMessageRef,
        updateComment: updateComment,
        updateCommentAsync: updateCommentAsync
    }), edit = _d.edit, editMessage = _d.editMessage, setEditMessage = _d.setEditMessage, saveEdit = _d.saveEdit, showEdit = _d.showEdit, closeEdit = _d.closeEdit;
    var _e = useReplyListData({
        details: details,
        curNest: curNest,
        maxNest: maxNest,
        loadList: loadList,
        updateReplyDetails: updateReplyDetails,
        updateCommentAsync: updateCommentAsync
    }), replyList = _e.replyList, replyCounts = _e.replyCounts, replyLoading = _e.replyLoading, showReply = _e.showReply, toggleReplyList = _e.toggleReplyList, fetchMore = _e.fetchMore, updateCommentInReplyAsync = _e.updateCommentInReplyAsync;
    var loggedUser = readLoggedUser();
    var canRenderReplyBtn = useMemo(function () { return curNest < maxNest; }, [curNest, maxNest]);
    var isOwnerComment = useMemo(function () { return loggedUser && loggedUser.id != null && loggedUser.id === details.user_id; }, [
        loggedUser,
        details.user_id
    ]);
    var insertEmoji = useCallback(function (emoji) {
        editMessageRef.current.insertToValue(emoji);
    }, []);
    return (React.createElement("div", { className: clx(messageBodyStyle['bbs-msg-wrapper'], (_a = {},
            _a[messageBodyStyle['msg-small']] = small,
            _a)) },
        React.createElement(ReplyEditRender, { details: details, edit: edit, small: small, editMessage: editMessage, setEditMessage: setEditMessage, editMessageRef: editMessageRef, insertEmoji: insertEmoji }),
        React.createElement("div", { className: clx((_b = {},
                _b[messageBodyStyle['bbs-msg-action']] = true,
                _b[messageBodyStyle['msg-small']] = small,
                _b)) },
            React.createElement(ReplyActions, { details: details, edit: edit, isOwnerComment: isOwnerComment, startReply: startReply, saveEdit: saveEdit, showEdit: showEdit, closeEdit: closeEdit }),
            React.createElement(ReplyListCount, { canRenderReplyBtn: canRenderReplyBtn, replyCounts: replyCounts, showReply: showReply, toggleReplyList: toggleReplyList })),
        React.createElement(ReplyListNest, { showReply: showReply, canRenderReplyBtn: canRenderReplyBtn, replyLoading: replyLoading, curNest: curNest, maxNest: maxNest, replyList: replyList, updateCommentInReplyAsync: updateCommentInReplyAsync, loadList: loadList, replyCounts: replyCounts, 
            // nodata={nodata}
            fetchMore: fetchMore })));
}
export default MessageBody;
//# sourceMappingURL=MessageBody.js.map