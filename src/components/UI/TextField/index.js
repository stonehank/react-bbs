import React, {useRef,useState, useReducer, useEffect, useImperativeHandle} from 'react';
import textFieldStyle from './textfield.module.scss'
import clx from 'classnames'
import {calcValueAndPos} from "../../../utils/DOM";


const TextField = React.forwardRef((props,forwardRef)=>{
    const {value, setValue, label, rows, placeholder, rules, outlined, autoHeight, ...otherProps} = props
    const labelRef = useRef(null)
    const inputRef = useRef(null)
    const legendRef = useRef(null)
    const fieldRef = useRef(null)
    const [dirty, setDirty] = useState(false)
    const [labelTextW, setLabelTextW] = useState(0)
    const [errorState, errorDispatch] = useReducer(errorReducer, {error: false, errorMsg: null});

    useEffect(()=>{
        let labelEle=labelRef.current
        if(label===''){
            setLabelTextW(0)
        }else{
            setLabelTextW(labelEle.offsetWidth)
        }
        if (value) {
            setDirty(true)
        }
        if (autoHeight) {
            calcHeight()
        }
        handleFocus()
        setDirty(false)
        handleBlur()
    },[])

    useImperativeHandle(forwardRef, () => {
        return {
            getElement,
            reset,
            validate,
            insertToValue
        }
    });

    function handleValueChange(ev) {
        setValue(ev.target.value)
        calcHeight()
    }

    function handleBlur() {
        let legendEle=legendRef.current
        let labelEle=labelRef.current
        let fieldEle=fieldRef.current
        if (!value && !placeholder) {
            legendEle.style.width = 0
            labelEle.style.top = '16px'
            labelEle.style.fontSize = '16px'
        }
        fieldEle.classList.remove(textFieldStyle['bbs-cus-fieldset-focus'])
        if (dirty) validate()
    }

    function handleFocus() {
        let legendEle=legendRef.current
        let labelEle=labelRef.current
        let fieldEle=fieldRef.current
        legendEle.style.width = labelTextW + 'px'
        labelEle.style.top = 0
        labelEle.style.fontSize = '12px'
        fieldEle.classList.add(textFieldStyle['bbs-cus-fieldset-focus'])
        setDirty(true)
    }

    function calcHeight() {
        let inputEle=inputRef.current
        inputEle.style.height = 'auto'
        inputEle.style.height = `${inputEle.scrollHeight + 2}px`
    }


    function errorReducer(state, errorMsg) {
        if(errorMsg!=null){
            return {
                error:true,
                errorMsg:errorMsg
            }
        }else{
            return {
                error:false,
                errorMsg:null
            }
        }
    }
    function validate() {
        console.log(value,label,rows)
        setDirty(true)
        if(rules.length===0){
            errorDispatch(null)
            return true
        }
        for(let ruleFunc of rules){
            let res=ruleFunc(value)
            if(res!==true){
                errorDispatch(res)
                return false
            }
        }
        errorDispatch(null)
        return true
    }
    function reset() {
        setValue('')
        errorDispatch(null)
        setDirty(false)
        calcHeight()
    }
    function insertToValue(str){
        let ele = inputRef.current
        let [newV, scrollTop, startPos] = calcValueAndPos(ele, str)
        setValue(newV)
        // todo maybe sync below
        setTimeout(()=>{
            ele.selectionStart = startPos + str.length;
            ele.selectionEnd = startPos + str.length;
            ele.scrollTop = scrollTop;
            ele.focus();
        })
    }

    function getElement(){
        return inputRef.current
    }

    console.log('render',value)
    return (
        <div className={textFieldStyle['bbs-cus-filedset-wrapper']} {...otherProps}>
            <div className={textFieldStyle['bbs-cus-fieldset-container']}>
                <fieldset ref={fieldRef}
                          className={clx({
                              [textFieldStyle['bbs-cus-fieldset-valid-form']]: true,
                              [textFieldStyle['bbs-cus-material-ui']]: !outlined,
                              [textFieldStyle['bbs-cus-bootstrap-ui']]: outlined,
                              [textFieldStyle['bbs-cus-error']]: errorState.error
                          })}
                >
                    <legend ref={legendRef} className={textFieldStyle['bbs-cus-fieldset-legend']}/>
                    <span ref={labelRef}
                          className={clx({
                              [textFieldStyle['bbs-cus-label-text']]: true,
                              [textFieldStyle['bbs-cus-text-error']]: errorState.error
                          })}
                    >
                {label}
            </span>
                </fieldset>
                {
                    rows
                        ?
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
                        :
                        <input
                            ref={inputRef}
                            className={clx({
                                [textFieldStyle['bbs-cus-valid-field']]: true,
                            })}
                            placeholder={placeholder}
                            value={value}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleValueChange}
                        />
                }
            </div>
            <div className={textFieldStyle['error-msg']}>{errorState.errorMsg}</div>
        </div>
    );
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

export default TextField;
