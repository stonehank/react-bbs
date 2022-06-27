"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var MessageHead_1 = __importDefault(require("./MessageHead"));
var MessageBody_1 = __importDefault(require("./MessageBody"));
var BBSCommentCard = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    margin:16px 0;\n"], ["\n    margin:16px 0;\n"])));
var BBSHr = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    border-top: 1px dashed var(--bbs-text-muted)\n"], ["\n    border-top: 1px dashed var(--bbs-text-muted)\n"])));
function MessageCard(props) {
    var index = props.index, details = props.details, small = props.small, curNest = props.curNest, maxNest = props.maxNest, loadList = props.loadList, updateCommentAsync = props.updateCommentAsync;
    console.log('MessageCard update');
    return (react_1["default"].createElement("div", { id: details.objectId },
        index !== 0 && curNest === 0 ? react_1["default"].createElement(BBSHr, null) : null,
        react_1["default"].createElement(BBSCommentCard, null,
            react_1["default"].createElement(MessageHead_1["default"], { small: small, details: details }),
            react_1["default"].createElement(MessageBody_1["default"], { small: small, details: details, updateCommentAsync: updateCommentAsync, loadList: loadList, curNest: curNest, maxNest: maxNest }))));
}
function propsAreEqual(prevProps, nextProps) {
    return prevProps.details.objectId === nextProps.details.objectId
        && prevProps.details.nickname === nextProps.details.nickname
        && prevProps.details.at === nextProps.details.at
        && prevProps.details.avatar === nextProps.details.avatar
        && prevProps.details.message === nextProps.details.message
        && prevProps.details.replyCounts === nextProps.details.replyCounts
        && prevProps.curNest === nextProps.curNest
        && prevProps.small === nextProps.small
        && prevProps.maxNest === nextProps.maxNest;
}
exports["default"] = react_1["default"].memo(MessageCard, propsAreEqual);
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map