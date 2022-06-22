"use strict";
exports.__esModule = true;
var react_1 = require("react");
function useReplyEdit(props) {
    var details = props.details, editMessageRef = props.editMessageRef, updateComment = props.updateComment, updateCommentAsync = props.updateCommentAsync;
    var _a = (0, react_1.useState)(false), edit = _a[0], setEdit = _a[1];
    var _b = (0, react_1.useState)(details.message), editMessage = _b[0], setEditMessage = _b[1];
    function showEdit() {
        setEdit(true);
        setEditMessage(details.message);
    }
    function closeEdit() {
        setEdit(false);
        setEditMessage(details.message);
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
exports["default"] = useReplyEdit;
//# sourceMappingURL=useReplyEdit.js.map