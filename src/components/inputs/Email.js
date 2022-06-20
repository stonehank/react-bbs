import React, {useRef, useImperativeHandle} from 'react';
import PropTypes from "prop-types";
import {emailVerify} from "../../utils/Verify";
import TextField from "../UI/TextField";

const Email=React.forwardRef((props,forwardRef)=>{
    const {email,setEmail, ...otherProps}=props
    const emailRef=useRef(null)

    useImperativeHandle(forwardRef,()=>({
        validate:emailRef.current.validate,
        reset:emailRef.current.reset,
        getElement:emailRef.current.getElement
    }),[emailRef])

    return (
        <TextField
            ref={emailRef}
            outlined={false}
            label={"邮箱"}
            rules={[v=>(!v || emailVerify(v)) || '提供一个有效的email']}
            value={email}
            setValue={setEmail}
            {...otherProps}
        />
    )
})


Email.propTypes={
    email:PropTypes.string,
    setEmail:PropTypes.func
}
Email.defaultProps={
    email:'',
}

function propsAreEqual(prevProps, nextProps) {
    return prevProps.email === nextProps.email
}
const MemoizedEmail = React.memo(Email, propsAreEqual);

export default MemoizedEmail;

