import React, {useRef, useImperativeHandle} from 'react';
import TextField from "../UI/TextField";
import PropTypes from "prop-types";

type NicknameProps={
    nickname:string,
    setNickname:(email:string)=>void,
    [x:string]:any
}

const Nickname=React.forwardRef((props:NicknameProps,forwardRef)=>{
    const {nickname,setNickname,...otherProps} = props
    const nicknameRef=useRef(null)

    useImperativeHandle(forwardRef,()=>({
        validate:nicknameRef.current.validate,
        reset:nicknameRef.current.reset,
        getElement:nicknameRef.current.getElement
    }))

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

Nickname.defaultProps={
    nickname:'',
}

export default React.memo(Nickname);


