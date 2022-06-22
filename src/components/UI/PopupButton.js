"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var Button_1 = __importDefault(require("./Button"));
var styled_components_1 = __importDefault(require("styled-components"));
var react_spring_1 = require("react-spring");
var prop_types_1 = __importDefault(require("prop-types"));
var useDidUpdate_1 = __importDefault(require("../../hooks/useDidUpdate"));
var StyledAnimatedPopup = (0, styled_components_1["default"])(react_spring_1.animated.div)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        position:fixed;\n        /*border:1px solid var(--bbs-separator-color);*/\n        background: var(--bbs-separator-background);\n        border-radius:6px;\n        min-width:64px;\n        min-height:64px;\n        padding:4px 0;\n        z-index: 99;\n"], ["\n        position:fixed;\n        /*border:1px solid var(--bbs-separator-color);*/\n        background: var(--bbs-separator-background);\n        border-radius:6px;\n        min-width:64px;\n        min-height:64px;\n        padding:4px 0;\n        z-index: 99;\n"])));
function PopupButton(props) {
    var show = props.show, setShow = props.setShow, beforeOpen = props.beforeOpen, popupContent = props.popupContent, children = props.children, otherProps = __rest(props, ["show", "setShow", "beforeOpen", "popupContent", "children"]);
    var _a = (0, react_1.useState)(!!show), newShow = _a[0], setNewShow = _a[1];
    var popupBoxRef = (0, react_1.useRef)(null);
    var buttonRef = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(0), boxTop = _b[0], setBoxTop = _b[1];
    var _c = (0, react_1.useState)(0), boxLeft = _c[0], setBoxLeft = _c[1];
    var _d = (0, react_1.useState)('top left'), origin = _d[0], setOrigin = _d[1];
    var _e = (0, react_spring_1.useSpring)(function () { return ({
        from: { scale: 0, opacity: 0, dspl: 0 }
    }); }), styles = _e[0], api = _e[1];
    // compatible control inside and outside
    var finalShow = show, finalSetShow = setShow;
    if (typeof setShow !== 'function') {
        finalSetShow = setNewShow;
        finalShow = newShow;
    }
    (0, react_1.useEffect)(function () {
        window.addEventListener('click', hide);
        window.addEventListener('resize', hide);
        return function () {
            window.removeEventListener('click', hide);
            window.removeEventListener('resize', hide);
        };
    }, []);
    (0, useDidUpdate_1["default"])(function () {
        api.start({
            scale: finalShow ? 1 : 0,
            opacity: finalShow ? 1 : 0,
            dspl: finalShow ? 1 : 0
        });
    }, [finalShow]);
    function stopPropagation(event) {
        event.stopPropagation();
    }
    function hide() {
        finalSetShow(false);
    }
    function togglePopup(ev) {
        ev.stopPropagation();
        if (!finalShow) {
            if (beforeOpen)
                beforeOpen();
            calcPopupPos();
        }
        finalSetShow(!finalShow);
    }
    function calcPopupPos() {
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
        var originY = '', originX = '';
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
            originX = ((left + btnW / 2) / window.innerWidth * 100) + '%';
        }
        else {
            setBoxLeft(left);
            originX = 'left';
        }
        setOrigin(originX + ' ' + originY);
    }
    return (react_1["default"].createElement(Button_1["default"], __assign({ ref: buttonRef, onClick: togglePopup }, otherProps),
        children,
        react_dom_1["default"].createPortal(react_1["default"].createElement("div", { className: "serverless-bbs" },
            react_1["default"].createElement(StyledAnimatedPopup, { onClick: stopPropagation, style: __assign(__assign({ top: boxTop, left: boxLeft, transformOrigin: origin }, styles), { display: styles.dspl.interpolate(function (display) {
                        return display === 0 ? 'none' : 'block';
                    }) }), ref: popupBoxRef }, popupContent())), document.body)));
}
PopupButton.propTypes = {
    style: prop_types_1["default"].any,
    popupContent: prop_types_1["default"].func,
    show: prop_types_1["default"].bool,
    setShow: prop_types_1["default"].func,
    beforeOpen: prop_types_1["default"].func
};
exports["default"] = PopupButton;
var templateObject_1;
//# sourceMappingURL=PopupButton.js.map