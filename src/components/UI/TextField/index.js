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
import React, { useRef, useState, useReducer, useEffect, useImperativeHandle, useCallback } from 'react';
import textFieldStyle from './textfield.module.scss';
import clx from 'classnames';
import { calcValueAndPos } from '../../../utils/DOM';
var TextField = React.forwardRef(function (props, forwardRef) {
    var _a, _b, _c, _d;
    var value = props.value, setValue = props.setValue, label = props.label, rows = props.rows, placeholder = props.placeholder, rules = props.rules, outlined = props.outlined, autoHeight = props.autoHeight, otherProps = __rest(props, ["value", "setValue", "label", "rows", "placeholder", "rules", "outlined", "autoHeight"]);
    var labelRef = useRef(null);
    var inputRef = useRef(null);
    var legendRef = useRef(null);
    var fieldRef = useRef(null);
    var dirty = useRef(false);
    // const [dirty, setDirty] = useState(false)
    var _e = useState(0), labelTextW = _e[0], setLabelTextW = _e[1];
    var _f = useReducer(errorReducer, { error: false, errorMsg: null }), errorState = _f[0], errorDispatch = _f[1];
    useEffect(function () {
        var labelEle = labelRef.current;
        if (label === '') {
            setLabelTextW(0);
        }
        else {
            setLabelTextW(labelEle.offsetWidth);
        }
        if (value) {
            dirty.current = true;
            // setDirty(true)
        }
        if (autoHeight) {
            calcHeight();
        }
        handleFocus();
        dirty.current = false;
        // setDirty(false)
        handleBlur();
    }, []);
    useImperativeHandle(forwardRef, function () {
        return {
            getElement: getElement,
            reset: reset,
            validate: validate,
            insertToValue: insertToValue
        };
    });
    var handleValueChange = useCallback(function (ev) {
        setValue(ev.target.value);
        calcHeight();
    }, []);
    var handleBlur = useCallback(function () {
        var legendEle = legendRef.current;
        var labelEle = labelRef.current;
        var fieldEle = fieldRef.current;
        if (!value && !placeholder) {
            legendEle.style.width = 0;
            labelEle.style.top = '16px';
            labelEle.style.fontSize = '16px';
        }
        fieldEle.classList.remove(textFieldStyle['bbs-cus-fieldset-focus']);
        if (dirty.current)
            validate();
    }, [value, placeholder]);
    var handleFocus = useCallback(function () {
        var legendEle = legendRef.current;
        var labelEle = labelRef.current;
        var fieldEle = fieldRef.current;
        legendEle.style.width = labelTextW + 'px';
        labelEle.style.top = 0;
        labelEle.style.fontSize = '12px';
        fieldEle.classList.add(textFieldStyle['bbs-cus-fieldset-focus']);
        dirty.current = true;
    }, []);
    var calcHeight = useCallback(function () {
        var inputEle = inputRef.current;
        inputEle.style.height = 'auto';
        inputEle.style.height = "".concat(inputEle.scrollHeight + 2, "px");
    }, []);
    function errorReducer(_, errorMsg) {
        if (errorMsg != null) {
            return {
                error: true,
                errorMsg: errorMsg
            };
        }
        else {
            return {
                error: false,
                errorMsg: null
            };
        }
    }
    var validate = useCallback(function () {
        dirty.current = true;
        if (rules.length === 0) {
            errorDispatch(null);
            return true;
        }
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var ruleFunc = rules_1[_i];
            var res = ruleFunc(value);
            if (res !== true) {
                errorDispatch(res);
                return false;
            }
        }
        errorDispatch(null);
        return true;
    }, [rules, value]);
    function reset() {
        setValue('');
        errorDispatch(null);
        dirty.current = false;
        calcHeight();
    }
    function insertToValue(str) {
        var ele = inputRef.current;
        var _a = calcValueAndPos(ele, str), newV = _a[0], scrollTop = _a[1], startPos = _a[2];
        setValue(newV);
        // todo maybe sync below
        setTimeout(function () {
            ele.selectionStart = startPos + str.length;
            ele.selectionEnd = startPos + str.length;
            ele.scrollTop = scrollTop;
            ele.focus();
        });
    }
    function getElement() {
        return inputRef.current;
    }
    return (React.createElement("div", __assign({ className: textFieldStyle['bbs-cus-filedset-wrapper'] }, otherProps),
        React.createElement("div", { className: textFieldStyle['bbs-cus-fieldset-container'] },
            React.createElement("fieldset", { ref: fieldRef, className: clx((_a = {},
                    _a[textFieldStyle['bbs-cus-fieldset-valid-form']] = true,
                    _a[textFieldStyle['bbs-cus-material-ui']] = !outlined,
                    _a[textFieldStyle['bbs-cus-bootstrap-ui']] = outlined,
                    _a[textFieldStyle['bbs-cus-error']] = errorState.error,
                    _a)) },
                React.createElement("legend", { ref: legendRef, className: textFieldStyle['bbs-cus-fieldset-legend'] }),
                React.createElement("span", { ref: labelRef, className: clx((_b = {},
                        _b[textFieldStyle['bbs-cus-label-text']] = true,
                        _b[textFieldStyle['bbs-cus-text-error']] = errorState.error,
                        _b)) }, label)),
            rows ? (React.createElement("textarea", { ref: inputRef, className: clx((_c = {},
                    _c[textFieldStyle['bbs-cus-valid-field']] = true,
                    _c[textFieldStyle['auto-height-textarea-root']] = autoHeight,
                    _c)), rows: rows, placeholder: placeholder, value: value, onFocus: handleFocus, onBlur: handleBlur, onChange: handleValueChange })) : (React.createElement("input", { ref: inputRef, className: clx((_d = {},
                    _d[textFieldStyle['bbs-cus-valid-field']] = true,
                    _d)), placeholder: placeholder, value: value, onFocus: handleFocus, onBlur: handleBlur, onChange: handleValueChange }))),
        React.createElement("div", { className: textFieldStyle['error-msg'] }, errorState.errorMsg)));
});
TextField.defaultProps = {
    value: '',
    rows: null,
    label: '',
    placeholder: '',
    rules: [],
    outlined: true,
    autoHeight: true
};
export default TextField;
//# sourceMappingURL=index.js.map