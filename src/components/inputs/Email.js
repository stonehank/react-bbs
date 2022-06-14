import React, {useEffect,useImperativeHandle} from 'react';
import PropTypes from "prop-types";
import {emailVerify} from "../../utils/Verify";
import TextField from "../UI/TextField";

const Email=React.forwardRef((props,forwardRef)=>{
    const emailRef=React.createRef(null)

    useImperativeHandle(forwardRef,()=>({
        validate:emailRef.current.validate,
        reset:emailRef.current.reset
    }),[emailRef])

    return (
        <TextField
            ref={emailRef}
            outlined={false}
            label={"昵称"}
            rules={[v=>(!v || emailVerify(v)) || '提供一个有效的email']}
            value={props.email}
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
export default Email;
