import React, { useRef, useImperativeHandle } from 'react'
import TextField from '../UI/TextField'

type Props = {
  message: string
  setMessage: React.Dispatch<string>
  label?: string
  rows?: string | number
}

const MessageInput = React.forwardRef((props: Props, forwardRef) => {
  const messageRef = useRef(null)

  useImperativeHandle(forwardRef, () => ({
    validate: messageRef.current.validate,
    reset: messageRef.current.reset,
    getElement: messageRef.current.getElement,
    insertToValue: messageRef.current.insertToValue
  }))

  return (
    <TextField
      ref={messageRef}
      rows={props.rows}
      outlined
      label={props.label}
      rules={[(v) => !!v || '内容不能为空']}
      value={props.message}
      setValue={props.setMessage}
    />
  )
})

MessageInput.defaultProps = {
  message: '',
  label: '说点什么吧',
  rows: 3
}

export default React.memo(MessageInput)
