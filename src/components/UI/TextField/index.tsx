import React, { useRef, useReducer, useEffect, useImperativeHandle, useCallback } from 'react'
import textFieldStyle from './textfield.module.scss'
import clx from 'classnames'
import { calcValueAndPos } from '../../../utils/DOM'

type Props = {
  value?: string;
  setValue?: React.Dispatch<string>;
  label?: string;
  rows?: number | null;
  placeholder?: string;
  rules?: any[];
  outlined?: boolean;
  autoHeight?: boolean;
  [x: string]: any;
}
function errorReducer(_, errorMsg) {
  if (errorMsg != null) {
    return {
      error: true,
      errorMsg: errorMsg
    }
  } else {
    return {
      error: false,
      errorMsg: null
    }
  }
}
const TextField = React.forwardRef((props: Props, forwardRef) => {
  const { value, setValue, label, rows, placeholder, rules, outlined, autoHeight, ...otherProps } = props
  const labelRef = useRef(null)
  const inputRef = useRef(null)
  const legendRef = useRef(null)
  const fieldRef = useRef(null)
  const dirty = useRef(false)
  // const [dirty, setDirty] = useState(false)
  const labelTextW = useRef(0)
  // const [labelTextW, syncLabelTextW, setLabelTextW] = useSyncState(0)
  const [errorState, errorDispatch] = useReducer(errorReducer, { error: false, errorMsg: null })

  const handleFocus = useCallback(function() {
    const legendEle = legendRef.current
    const labelEle = labelRef.current
    const fieldEle = fieldRef.current
    legendEle.style.width = labelTextW.current + 'px'
    labelEle.style.top = 0
    labelEle.style.fontSize = '12px'
    fieldEle.classList.add(textFieldStyle['bbs-cus-fieldset-focus'])
    dirty.current = true
  }, [])

  const calcHeight = useCallback(function() {
    const inputEle = inputRef.current
    inputEle.style.height = 'auto'
    inputEle.style.height = `${inputEle.scrollHeight + 2}px`
  }, [])

  const validate = useCallback(
    function() {
      dirty.current = true
      if (rules.length === 0) {
        errorDispatch(null)
        return true
      }
      for (const ruleFunc of rules) {
        const res = ruleFunc(value)
        if (res !== true) {
          errorDispatch(res)
          return false
        }
      }
      errorDispatch(null)
      return true
    },
    [rules, value]
  )
  const handleBlur = useCallback(
    function() {
      const legendEle = legendRef.current
      const labelEle = labelRef.current
      const fieldEle = fieldRef.current
      if (!value && !placeholder) {
        legendEle.style.width = 0
        labelEle.style.top = '16px'
        labelEle.style.fontSize = '16px'
      }
      fieldEle.classList.remove(textFieldStyle['bbs-cus-fieldset-focus'])
      if (dirty.current) validate()
    },
    [value, placeholder]
  )
  function reset() {
    setValue('')
    errorDispatch(null)
    dirty.current = false
    calcHeight()
  }
  function insertToValue(str) {
    const ele = inputRef.current
    const [newV, scrollTop, startPos] = calcValueAndPos(ele, str)
    setValue(newV)
    // todo maybe sync below
    setTimeout(() => {
      ele.selectionStart = startPos + str.length
      ele.selectionEnd = startPos + str.length
      ele.scrollTop = scrollTop
      ele.focus()
    })
  }
  const handleValueChange = useCallback(function(ev) {
    setValue(ev.target.value)
    calcHeight()
  }, [])

  function getElement() {
    return inputRef.current
  }
  useEffect(() => {
    const labelEle = labelRef.current
    if (label === '') {
      // setLabelTextW(0)
      labelTextW.current = 0
    } else {
      labelTextW.current = labelEle.offsetWidth
      // setLabelTextW(labelEle.offsetWidth)
    }
    if (value) {
      dirty.current = true
      // setDirty(true)
    }
    if (autoHeight) {
      calcHeight()
    }
    handleFocus()
    dirty.current = false
    // setDirty(false)
    handleBlur()
  }, [])

  useImperativeHandle(forwardRef, () => {
    return {
      getElement,
      reset,
      validate,
      insertToValue
    }
  })
  return (
    <div className={textFieldStyle['bbs-cus-filedset-wrapper']} {...otherProps}>
      <div className={textFieldStyle['bbs-cus-fieldset-container']}>
        <fieldset
          ref={fieldRef}
          className={clx({
            [textFieldStyle['bbs-cus-fieldset-valid-form']]: true,
            [textFieldStyle['bbs-cus-material-ui']]: !outlined,
            [textFieldStyle['bbs-cus-bootstrap-ui']]: outlined,
            [textFieldStyle['bbs-cus-error']]: errorState.error
          })}
        >
          <legend ref={legendRef} className={textFieldStyle['bbs-cus-fieldset-legend']} />
          <span
            ref={labelRef}
            className={clx({
              [textFieldStyle['bbs-cus-label-text']]: true,
              [textFieldStyle['bbs-cus-text-error']]: errorState.error
            })}
          >
            {label}
          </span>
        </fieldset>
        {rows ? (
          <textarea
            ref={inputRef}
            className={clx({
              [textFieldStyle['bbs-cus-valid-field']]: true,
              [textFieldStyle['auto-height-textarea-root']]: autoHeight
            })}
            rows={rows}
            placeholder={placeholder}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleValueChange}
          />
        ) : (
          <input
            ref={inputRef}
            className={clx({
              [textFieldStyle['bbs-cus-valid-field']]: true
            })}
            placeholder={placeholder}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleValueChange}
          />
        )}
      </div>
      <div className={textFieldStyle['error-msg']}>{errorState.errorMsg}</div>
    </div>
  )
})

TextField.defaultProps = {
  value: '',
  rows: null,
  label: '',
  placeholder: '',
  rules: [],
  outlined: true,
  autoHeight: true
}

export default TextField
