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
import React, { useRef, useImperativeHandle } from 'react';
import { emailVerify } from '../../utils/Verify';
import TextField from '../UI/TextField';
var Email = React.forwardRef(function (_a, forwardRef) {
    var _b = _a.email, email = _b === void 0 ? '' : _b, setEmail = _a.setEmail, otherProps = __rest(_a, ["email", "setEmail"]);
    var emailRef = useRef(null);
    useImperativeHandle(forwardRef, function () { return ({
        validate: emailRef.current.validate,
        reset: emailRef.current.reset,
        getElement: emailRef.current.getElement
    }); });
    return (React.createElement(TextField, __assign({ ref: emailRef, outlined: false, label: '\u90AE\u7BB1', rules: [function (v) { return !v || emailVerify(v) || '提供一个有效的email'; }], value: email, setValue: setEmail }, otherProps)));
});
export default React.memo(Email, function (prev, next) { return prev.email === next.email; });
//# sourceMappingURL=Email.js.map