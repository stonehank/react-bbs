import React, {useRef, useImperativeHandle} from 'react';
import TextField from "../UI/TextField";
import PropTypes from "prop-types";

const Nickname=React.forwardRef((props,forwardRef)=>{
    const {nickname,setNickname,...otherProps} = props
    const nicknameRef=useRef(null)

    useImperativeHandle(forwardRef,()=>({
        validate:nicknameRef.current.validate,
        reset:nicknameRef.current.reset,
        getElement:nicknameRef.current.getElement
    }),[nicknameRef])

    return (
        <TextField
            ref={nicknameRef}
            outlined={false}
            label={"昵称"}
            rules={[v=>!!v || '昵称必须填写']}
            value={nickname}
            setValue={setNickname}
            {...otherProps}
        />
    )
})


Nickname.propTypes={
    nickname:PropTypes.string,
    setNickname:PropTypes.func
}
Nickname.defaultProps={
    nickname:'',
}
export default Nickname;
