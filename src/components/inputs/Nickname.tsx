import React, { useRef, useImperativeHandle } from 'react'
import TextField from '../UI/TextField'

type NicknameProps = {
  nickname: string;
  setNickname: (email: string) => void;
  [x: string]: any;
}

const Nickname = React.forwardRef(({ nickname='', setNickname, ...otherProps }: NicknameProps, forwardRef) => {
  const nicknameRef = useRef(null)

  useImperativeHandle(forwardRef, () => ({
    validate: nicknameRef.current.validate,
    reset: nicknameRef.current.reset,
    getElement: nicknameRef.current.getElement
  }))

  return (
    <TextField
      ref={nicknameRef}
      outlined={false}
      label='Nickname'
      rules={[(v) => !!v || 'Nickname is required']}
      value={nickname}
      setValue={setNickname}
      {...otherProps}
    />
  )
})



export default React.memo(Nickname, (prev, next) => prev.nickname === next.nickname)
