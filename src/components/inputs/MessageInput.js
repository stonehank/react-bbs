import React, { useRef, useImperativeHandle } from 'react';
import TextField from '../UI/TextField';
var MessageInput = React.forwardRef(function (props, forwardRef) {
    var messageRef = useRef(null);
    useImperativeHandle(forwardRef, function () { return ({
        validate: messageRef.current.validate,
        reset: messageRef.current.reset,
        getElement: messageRef.current.getElement,
        insertToValue: messageRef.current.insertToValue
    }); });
    return (React.createElement(TextField, { ref: messageRef, rows: props.rows, outlined: true, label: props.label, rules: [function (v) { return !!v || '内容不能为空'; }], value: props.message, setValue: props.setMessage }));
});
MessageInput.defaultProps = {
    message: '',
    label: '说点什么吧',
    rows: 3
};
export default React.memo(MessageInput);
//# sourceMappingURL=MessageInput.js.map