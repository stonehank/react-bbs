import React, { useRef, useImperativeHandle } from 'react'
import TextField from '../UI/TextField'

type Props = {
  message: string;
  setMessage: React.Dispatch<string>;
  label?: string;
  rows?: string | number;
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
      rules={[(v) => !!v || 'Message is required']}
      value={props.message}
      setValue={props.setMessage}
    />
  )
})

MessageInput.defaultProps = {
  message: '',
  label: 'Leave your message here',
  rows: 3
}

export default React.memo(MessageInput)
