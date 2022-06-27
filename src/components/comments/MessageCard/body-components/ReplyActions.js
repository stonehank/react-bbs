"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var message_body_module_scss_1 = __importDefault(require("../scss/message-body.module.scss"));
var Button_1 = __importDefault(require("../../../UI/Button"));
function ReplyActions(_a) {
    var details = _a.details, edit = _a.edit, isOwnerComment = _a.isOwnerComment, startReply = _a.startReply, saveEdit = _a.saveEdit, showEdit = _a.showEdit, closeEdit = _a.closeEdit;
    if (edit && isOwnerComment) {
        return (react_1["default"].createElement("div", { className: message_body_module_scss_1["default"]['bbs-msg-action-edit'] },
            react_1["default"].createElement(Button_1["default"], { dense: true, text: true, className: "mr-4", onClick: closeEdit }, "\u53D6\u6D88"),
            react_1["default"].createElement(Button_1["default"], { dense: true, text: true, color: "success", className: "mr-4", onClick: saveEdit }, "\u4FDD\u5B58")));
    }
    return (react_1["default"].createElement("div", { className: message_body_module_scss_1["default"]['bbs-msg-action-no-edit'] },
        isOwnerComment
            ?
                react_1["default"].createElement(Button_1["default"], { dense: true, text: true, className: "mr-4", onClick: showEdit }, "\u7F16\u8F91")
            :
                null,
        react_1["default"].createElement(Button_1["default"], { dense: true, text: true, className: "mr-4", color: "info", onClick: function () { return startReply({
                rootId: details.rootId || details.objectId,
                replyId: details.objectId,
                replyName: details.nickname
            }); } }, "\u56DE\u590D")));
}
function propsIsEqual(prev, next) {
    for (var k in prev) {
        if (!prev.hasOwnProperty(k))
            continue;
        if (typeof prev[k] !== 'function' && prev[k] !== next[k])
            return false;
    }
    return true;
}
exports["default"] = react_1["default"].memo(ReplyActions, propsIsEqual);
//# sourceMappingURL=ReplyActions.js.map