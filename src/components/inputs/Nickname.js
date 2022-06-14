import React, {useImperativeHandle} from 'react';
import TextField from "../UI/TextField";
import PropTypes from "prop-types";

const Nickname=React.forwardRef((props,forwardRef)=>{
    const nicknameRef=React.createRef(null)

    useImperativeHandle(forwardRef,()=>({
        validate:nicknameRef.current.validate,
        reset:nicknameRef.current.reset
    }),[nicknameRef])

    return (
        <TextField
            ref={nicknameRef}
            outlined={false}
            label={"昵称"}
            rules={[v=>!!v || '昵称必须填写']}
            value={props.nickname}
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
