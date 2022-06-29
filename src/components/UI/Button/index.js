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
import React from 'react';
import cls from 'classnames';
import buttonStyle from './button.module.scss';
import Loading from '../Loading';
var Button = React.forwardRef(function (props, ref) {
    var _a;
    var onClick = props.onClick, color = props.color, text = props.text, dense = props.dense, disabled = props.disabled, loading = props.loading, children = props.children, className = props.className, otherProps = __rest(props, ["onClick", "color", "text", "dense", "disabled", "loading", "children", "className"]);
    return (React.createElement("button", __assign({ ref: ref, onClick: onClick, className: cls(className, (_a = {},
            _a[buttonStyle['bbs-btn']] = true,
            // @ts-ignore
            _a[buttonStyle[color + '-color']] = !!color,
            _a[buttonStyle['bbs-btn-text']] = text,
            _a[buttonStyle['no-gap']] = dense,
            _a[buttonStyle['bbs-disabled']] = disabled,
            _a[buttonStyle['bbs-btn-loading']] = loading,
            _a)) }, otherProps), loading ? React.createElement(Loading, { size: 22 }) : children));
});
export default Button;
//# sourceMappingURL=index.js.map