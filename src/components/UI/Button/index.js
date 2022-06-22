"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var button_module_scss_1 = __importDefault(require("./button.module.scss"));
var Loading_1 = __importDefault(require("../Loading"));
var Button = react_1["default"].forwardRef(function (props, ref) {
    var _a;
    var onClick = props.onClick, color = props.color, text = props.text, dense = props.dense, disabled = props.disabled, loading = props.loading, children = props.children, className = props.className, otherProps = __rest(props, ["onClick", "color", "text", "dense", "disabled", "loading", "children", "className"]);
    return (react_1["default"].createElement("button", __assign({ ref: ref, onClick: onClick, className: (0, classnames_1["default"])(className, (_a = {},
            _a[button_module_scss_1["default"]['bbs-btn']] = true,
            // @ts-ignore
            _a[button_module_scss_1["default"][color + '-color']] = !!color,
            _a[button_module_scss_1["default"]['bbs-btn-text']] = text,
            _a[button_module_scss_1["default"]['no-gap']] = dense,
            _a[button_module_scss_1["default"]['bbs-disabled']] = disabled,
            _a[button_module_scss_1["default"]['bbs-btn-loading']] = loading,
            _a)) }, otherProps), loading ? react_1["default"].createElement(Loading_1["default"], { size: 22 }) : children));
});
exports["default"] = Button;
//# sourceMappingURL=index.js.map