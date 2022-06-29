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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import useDidUpdate from '../../hooks/useDidUpdate';
var StyledAnimatedPopup = styled(animated.div)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  /*border:1px solid var(--bbs-separator-color);*/\n  background: var(--bbs-separator-background);\n  border-radius: 6px;\n  min-width: 64px;\n  min-height: 64px;\n  padding: 4px 0;\n  z-index: 99;\n"], ["\n  position: fixed;\n  /*border:1px solid var(--bbs-separator-color);*/\n  background: var(--bbs-separator-background);\n  border-radius: 6px;\n  min-width: 64px;\n  min-height: 64px;\n  padding: 4px 0;\n  z-index: 99;\n"])));
function PopupButton(props) {
    var show = props.show, setShow = props.setShow, beforeOpen = props.beforeOpen, popupContent = props.popupContent, children = props.children, otherProps = __rest(props, ["show", "setShow", "beforeOpen", "popupContent", "children"]);
    var _a = useState(!!show), newShow = _a[0], setNewShow = _a[1];
    var popupBoxRef = useRef(null);
    var buttonRef = useRef(null);
    var _b = useState(0), boxTop = _b[0], setBoxTop = _b[1];
    var _c = useState(0), boxLeft = _c[0], setBoxLeft = _c[1];
    var _d = useState('top left'), origin = _d[0], setOrigin = _d[1];
    var _e = useSpring(function () { return ({
        from: { scale: 0, opacity: 0, dspl: 0 }
    }); }), styles = _e[0], api = _e[1];
    // compatible control inside and outside
    var finalShow = show;
    var finalSetShow = setShow;
    if (typeof setShow !== 'function') {
        finalSetShow = setNewShow;
        finalShow = newShow;
    }
    useEffect(function () {
        window.addEventListener('click', hide);
        window.addEventListener('resize', hide);
        return function () {
            window.removeEventListener('click', hide);
            window.removeEventListener('resize', hide);
        };
    }, []);
    useDidUpdate(function () {
        api.start({
            scale: finalShow ? 1 : 0,
            opacity: finalShow ? 1 : 0,
            dspl: finalShow ? 1 : 0
        });
    }, [finalShow]);
    var stopPropagation = useCallback(function (event) {
        event.stopPropagation();
    }, []);
    function hide() {
        finalSetShow(false);
    }
    var calcPopupPos = useCallback(function () {
        if (!buttonRef.current || !popupBoxRef.current)
            return;
        var _a = buttonRef.current.getBoundingClientRect(), top = _a.top, left = _a.left, btnH = _a.height, btnW = _a.width;
        var popEle = popupBoxRef.current;
        popEle.style.display = 'block';
        var popW = popEle.offsetWidth;
        var popH = popEle.offsetHeight;
        popEle.style.display = 'none';
        var fromTop = top - 4;
        var fromBottom = window.innerHeight - top - btnH - 4;
        var fromLeft = left + btnW;
        var fromRight = window.innerWidth - left;
        var originY = '';
        var originX = '';
        if (fromTop > popH && fromBottom < popH) {
            setBoxTop(top - 4 - popH);
            originY = 'bottom';
        }
        else {
            setBoxTop(top + btnH + 4);
            originY = 'top';
        }
        if (fromLeft > popW && fromRight < popW) {
            setBoxLeft(left + btnW - popW);
            originX = 'right';
        }
        else if (fromLeft < popW && fromRight < popW) {
            setBoxLeft((window.innerWidth - popW - 4) / 2);
            originX = ((left + btnW / 2) / window.innerWidth) * 100 + '%';
        }
        else {
            setBoxLeft(left);
            originX = 'left';
        }
        setOrigin(originX + ' ' + originY);
    }, []);
    var togglePopup = useCallback(function (ev) {
        ev.stopPropagation();
        if (!finalShow) {
            if (beforeOpen)
                beforeOpen();
            calcPopupPos();
        }
        finalSetShow(!finalShow);
    }, [finalShow, beforeOpen, calcPopupPos]);
    return (React.createElement(Button, __assign({ ref: buttonRef, onClick: togglePopup }, otherProps),
        children,
        ReactDOM.createPortal(React.createElement("div", { className: 'serverless-bbs' },
            React.createElement(StyledAnimatedPopup, { onClick: stopPropagation, style: __assign(__assign({ top: boxTop, left: boxLeft, transformOrigin: origin }, styles), { display: styles.dspl.interpolate(function (display) { return (display === 0 ? 'none' : 'block'); }) }), ref: popupBoxRef }, popupContent())), document.body)));
}
export default PopupButton;
var templateObject_1;
//# sourceMappingURL=PopupButton.js.map