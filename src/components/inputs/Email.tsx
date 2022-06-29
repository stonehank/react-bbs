import React, { useRef, useImperativeHandle } from 'react'
import { emailVerify } from '../../utils/Verify'
import TextField from '../UI/TextField'

type EmailProps = {
  email: string
  setEmail: (email: string) => void
  [x: string]: any
}

const Email = React.forwardRef((props: EmailProps, forwardRef) => {
  const { email, setEmail, ...otherProps } = props
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
      label='邮箱'
      rules={[(v) => !v || emailVerify(v) || '提供一个有效的email']}
      value={email}
      setValue={setEmail}
      {...otherProps}
    />
  )
})

Email.defaultProps = {
  email: ''
}

export default React.memo(Email, (prev, next) => prev.email === next.email)
