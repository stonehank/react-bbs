import { useCallback, useState } from 'react';
function useReplyEdit(props) {
    var details = props.details, editMessageRef = props.editMessageRef, updateComment = props.updateComment, updateCommentAsync = props.updateCommentAsync;
    var _a = useState(false), edit = _a[0], setEdit = _a[1];
    var _b = useState(details.message), editMessage = _b[0], setEditMessage = _b[1];
    function showEdit() {
        setEdit(true);
        setEditMessage(details.message);
    }
    function closeEdit() {
        setEdit(false);
        setEditMessage(details.message);
    }
    var saveEdit = useCallback(function () {
        if (!validate())
            return;
        var id = details.objectId;
        updateComment(id, editMessage).then(function (data) {
            if (!data)
                return;
            closeEdit();
            updateCommentAsync(id, data);
        });
    }, [editMessage, details.id]);
    function validate() {
        return editMessageRef.current.validate();
    }
    return {
        edit: edit,
        editMessage: editMessage,
        setEditMessage: setEditMessage,
        saveEdit: saveEdit,
        showEdit: showEdit,
        closeEdit: closeEdit
    };
}
export default useReplyEdit;
//# sourceMappingURL=useReplyEdit.js.map