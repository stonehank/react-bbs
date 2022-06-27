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
var PopupButton_1 = __importDefault(require("../UI/PopupButton"));
var emoji_json_1 = __importDefault(require("../../assets/emoji.json"));
var StyledPopupButton = (0, styled_components_1["default"])(PopupButton_1["default"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    padding-left:0;\n    padding-right:0;\n"], ["\n    padding-left:0;\n    padding-right:0;\n"])));
var EmojiBox = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    font-size: 16px;\n    text-align:justify;\n    overflow: auto;\n    width: 245px;\n    height: 200px;\n    display:flex;\n    flex-flow:wrap;\n    border-radius: 6px;\n    user-select: none;\n"], ["\n    font-size: 16px;\n    text-align:justify;\n    overflow: auto;\n    width: 245px;\n    height: 200px;\n    display:flex;\n    flex-flow:wrap;\n    border-radius: 6px;\n    user-select: none;\n"])));
var EmojiItem = styled_components_1["default"].span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    font-style: normal;\n    padding: 6px 0;\n    width: 32px;\n    cursor: pointer;\n    text-align: center;\n    display: inline-block;\n    vertical-align: middle;\n    transition:background .5s linear;\n    &:hover{\n        background:var(--bbs-info-color);\n    }\n"], ["\n    font-style: normal;\n    padding: 6px 0;\n    width: 32px;\n    cursor: pointer;\n    text-align: center;\n    display: inline-block;\n    vertical-align: middle;\n    transition:background .5s linear;\n    &:hover{\n        background:var(--bbs-info-color);\n    }\n"])));
function Emoji(props) {
    function onSelect(emoji) {
        return function () {
            props.onSelect(emoji);
        };
    }
    return (react_1["default"].createElement(StyledPopupButton, { color: "error", text: true, dense: true, popupContent: function () { return (react_1["default"].createElement(EmojiBox, null, Object.entries(emoji_json_1["default"]).map(function (_a) {
            var name = _a[0], emoji = _a[1];
            return (react_1["default"].createElement(EmojiItem, { title: name, key: name, onClick: onSelect(emoji) }, emoji));
        }))); } }, "\uD83D\uDE04 \u8868\u60C5"));
}
exports["default"] = react_1["default"].memo(Emoji, function () { return true; });
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Emoji.js.map