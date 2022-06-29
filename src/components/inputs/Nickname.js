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
import TextField from '../UI/TextField';
var Nickname = React.forwardRef(function (props, forwardRef) {
    var nickname = props.nickname, setNickname = props.setNickname, otherProps = __rest(props, ["nickname", "setNickname"]);
    var nicknameRef = useRef(null);
    useImperativeHandle(forwardRef, function () { return ({
        validate: nicknameRef.current.validate,
        reset: nicknameRef.current.reset,
        getElement: nicknameRef.current.getElement
    }); });
    return (React.createElement(TextField, __assign({ ref: nicknameRef, outlined: false, label: '\u6635\u79F0', rules: [function (v) { return !!v || '昵称必须填写'; }], value: nickname, setValue: setNickname }, otherProps)));
});
Nickname.defaultProps = {
    nickname: ''
};
export default React.memo(Nickname, function (prev, next) { return prev.nickname === next.nickname; });
//# sourceMappingURL=Nickname.js.map