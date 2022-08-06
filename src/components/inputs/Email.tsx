import React, { useRef, useImperativeHandle } from 'react'
import { emailVerify } from '../../utils/Verify'
import TextField from '../UI/TextField'

type EmailProps = {
  email: string;
  setEmail: (email: string) => void;
  [x: string]: any;
}

const Email = React.forwardRef(({ email='', setEmail, ...otherProps }: EmailProps, forwardRef) => {
  const emailRef = useRef(null)

  useImperativeHandle(forwardRef, () => ({
    validate: emailRef.current.validate,
    reset: emailRef.current.reset,
    getElement: emailRef.current.getElement
  }))

  return (
    <TextField
      ref={emailRef}
      outlined={false}
      label='Email'
      rules={[(v) => !v || emailVerify(v) || 'A valid email is required']}
      value={email}
      setValue={setEmail}
      {...otherProps}
    />
  )
})


export default React.memo(Email, (prev, next) => prev.email === next.email)
