"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var message_body_module_scss_1 = __importDefault(require("../scss/message-body.module.scss"));
var MessageRender_1 = __importDefault(require("../MessageRender"));
var MessageInput_1 = __importDefault(require("../../../inputs/MessageInput"));
var ActionsBar_1 = __importDefault(require("../../../actions/ActionsBar"));
function ReplyEditRender(_a) {
    var _b;
    var details = _a.details, edit = _a.edit, small = _a.small, editMessage = _a.editMessage, setEditMessage = _a.setEditMessage, editMessageRef = _a.editMessageRef, insertEmoji = _a.insertEmoji;
    return (react_1["default"].createElement("div", { className: (0, classnames_1["default"])(message_body_module_scss_1["default"]["bbs-msg-body"], (_b = {},
            _b[message_body_module_scss_1["default"]["msg-small"]] = small,
            _b)) }, !edit
        ?
            react_1["default"].createElement(MessageRender_1["default"], { details: details })
        :
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(MessageInput_1["default"], { message: editMessage, setMessage: setEditMessage, ref: editMessageRef, label: "编辑内容", rows: 3 }),
                react_1["default"].createElement(ActionsBar_1["default"], { message: editMessage, insertEmoji: insertEmoji, replyId: details.replyId, at: details.at }))));
}
exports["default"] = react_1["default"].memo(ReplyEditRender);
//# sourceMappingURL=ReplyEditRender.js.map