var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import styled from 'styled-components';
import PopupButton from '../UI/PopupButton';
import emojiList from '../../assets/emoji.json';
var StyledPopupButton = styled(PopupButton)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding-left: 0;\n  padding-right: 0;\n"], ["\n  padding-left: 0;\n  padding-right: 0;\n"])));
var EmojiBox = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-size: 16px;\n  text-align: justify;\n  overflow: auto;\n  width: 245px;\n  height: 200px;\n  display: flex;\n  flex-flow: wrap;\n  border-radius: 6px;\n  user-select: none;\n"], ["\n  font-size: 16px;\n  text-align: justify;\n  overflow: auto;\n  width: 245px;\n  height: 200px;\n  display: flex;\n  flex-flow: wrap;\n  border-radius: 6px;\n  user-select: none;\n"])));
var EmojiItem = styled.span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-style: normal;\n  padding: 6px 0;\n  width: 32px;\n  cursor: pointer;\n  text-align: center;\n  display: inline-block;\n  vertical-align: middle;\n  transition: background 0.5s linear;\n  &:hover {\n    background: var(--bbs-info-color);\n  }\n"], ["\n  font-style: normal;\n  padding: 6px 0;\n  width: 32px;\n  cursor: pointer;\n  text-align: center;\n  display: inline-block;\n  vertical-align: middle;\n  transition: background 0.5s linear;\n  &:hover {\n    background: var(--bbs-info-color);\n  }\n"])));
function Emoji(props) {
    function onSelect(emoji) {
        return function () {
            props.onSelect(emoji);
        };
    }
    return (React.createElement(StyledPopupButton, { color: 'error', text: true, dense: true, popupContent: function () { return (React.createElement(EmojiBox, null, Object.entries(emojiList).map(function (_a) {
            var name = _a[0], emoji = _a[1];
            return (React.createElement(EmojiItem, { title: name, key: name, onClick: onSelect(emoji) }, emoji));
        }))); } }, "\uD83D\uDE04 \u8868\u60C5"));
}
export default React.memo(Emoji, function () { return true; });
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Emoji.js.map