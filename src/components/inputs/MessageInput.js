import React, {useRef,useImperativeHandle} from 'react';
import TextField from "../UI/TextField";
import PropTypes from "prop-types";

const MessageInput=React.forwardRef((props,forwardRef)=>{
    const messageRef=useRef(null)

    useImperativeHandle(forwardRef,()=>({
        validate:messageRef.current.validate,
        reset:messageRef.current.reset,
        getElement:messageRef.current.getElement,
        insertToValue:messageRef.current.insertToValue
    }))

    return (
        <TextField
            ref={messageRef}
            rows={props.rows}
            outlined={true}
            label={props.label}
            rules={[v=>!!v || '内容不能为空']}
            value={props.message}
            setValue={props.setMessage}
        />
    )
})


MessageInput.propTypes={
    message:PropTypes.string,
    setMessage:PropTypes.func,
    label:PropTypes.string,
    rows:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
}
MessageInput.defaultProps={
    message:'',
    label:'说点什么吧',
    rows:3,
}
export default MessageInput;

