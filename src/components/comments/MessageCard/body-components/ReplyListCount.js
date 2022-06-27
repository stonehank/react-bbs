"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var message_body_module_scss_1 = __importDefault(require("../scss/message-body.module.scss"));
var Button_1 = __importDefault(require("../../../UI/Button"));
function ReplyListCount(_a) {
    var canRenderReplyBtn = _a.canRenderReplyBtn, replyCounts = _a.replyCounts, showReply = _a.showReply, toggleReplyList = _a.toggleReplyList;
    if (!canRenderReplyBtn)
        return null;
    return (react_1["default"].createElement("span", { className: message_body_module_scss_1["default"]['bbs-reply-btn'] }, replyCounts > 0 &&
        react_1["default"].createElement(Button_1["default"], { dense: true, onClick: toggleReplyList, text: true }, showReply ? react_1["default"].createElement("span", null, "\u6536\u8D77\u8BC4\u8BBA") : react_1["default"].createElement("span", null,
            replyCounts,
            "\u6761\u8BC4\u8BBA"))));
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
exports["default"] = react_1["default"].memo(ReplyListCount, propsIsEqual);
//# sourceMappingURL=ReplyListCount.js.map