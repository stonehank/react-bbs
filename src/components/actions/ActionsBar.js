var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import MarkdownIcon from './MarkdownIcon';
import Emoji from '../inputs/Emoji';
import Button from '../UI/Button';
import PreviewRender from './PreviewRender';
var StyledActionBar = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"])));
var StyledPreviewBtn = styled(Button)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 0;\n  margin-left: 16px;\n"], ["\n  padding: 0;\n  margin-left: 16px;\n"])));
function ActionsBar(props) {
    var insertEmoji = props.insertEmoji, message = props.message, at = props.at, replyId = props.replyId;
    var _a = useState(true), preview = _a[0], setPreview = _a[1];
    var _b = useSpring(function () { return ({
        from: { scaleY: 0, opacity: 0, dspl: 0 }
    }); }), styles = _b[0], api = _b[1];
    useEffect(function () {
        api.start({
            scaleY: preview ? 1 : 0,
            opacity: preview ? 1 : 0,
            dspl: preview ? 1 : 0
        });
    }, [preview]);
    var togglePreview = useCallback(function () {
        setPreview(!preview);
    }, [preview]);
    return (React.createElement(React.Fragment, null,
        React.createElement(StyledActionBar, null,
            React.createElement(MarkdownIcon, null),
            React.createElement("div", { className: 'text-right' },
                React.createElement(Emoji, { onSelect: insertEmoji }),
                React.createElement(StyledPreviewBtn, { className: 'text-sm', text: true, color: preview ? 'success' : '', onClick: togglePreview },
                    "\u9884\u89C8:",
                    preview ? 'On' : 'Off'))),
        React.createElement(animated.div, { style: __assign(__assign({}, styles), { transformOrigin: 'top center', display: styles.dspl.interpolate(function (display) {
                    return display === 0 ? 'none' : 'block';
                }) }) },
            React.createElement(PreviewRender, { preview: preview, message: message, replyId: replyId, at: at }))));
}
export default React.memo(ActionsBar);
var templateObject_1, templateObject_2;
//# sourceMappingURL=ActionsBar.js.map