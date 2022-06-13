import React, {useState, useReducer, useEffect, useImperativeHandle} from 'react';
import textFieldStyle from './textfield.module.scss'
import clx from 'classnames'


const TextField = React.forwardRef((props,forwardRef)=>{
    const labelRef = React.createRef(null)
    const inputRef = React.createRef(null)
    const legendRef = React.createRef(null)
    const fieldRef = React.createRef(null)
    const [value, setValue] = useState(props.value)
    const [dirty, setDirty] = useState(false)
    const [labelTextW, setLabelTextW] = useState(0)
    const [errorState, errorDispatch] = useReducer(errorReducer, {error: false, errorMsg: null});

    useImperativeHandle(forwardRef, () => ({
        getElement,
        reset
    }));

    useEffect(()=>{
        let labelEle=labelRef.current
        if(props.label===''){
            setLabelTextW(0)
        }else{
            setLabelTextW(labelEle.offsetWidth)
        }
        if (value) {
            setDirty(true)
        }
        if (props.autoHeight) {
            calcHeight()
        }
        handleFocus()
        setDirty(false)
        handleBlur()
    },[])

    function handleValueChange(ev) {
        setValue(ev.target.value)
        calcHeight()
    }

    function handleBlur() {
        let legendEle=legendRef.current
        let labelEle=labelRef.current
        let fieldEle=fieldRef.current
        if (!value && !props.placeholder) {
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
        setDirty(true)
        if(props.rules.length===0){
            errorDispatch(null)
            return true
        }
        for(let ruleFunc of props.rules){
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
    function getElement(){
        return inputRef.current
    }
    return (
        <div className={textFieldStyle['bbs-cus-filedset-wrapper']}>
            <div className={textFieldStyle['bbs-cus-fieldset-container']}>
                <fieldset ref={fieldRef}
                          className={clx({
                              [textFieldStyle['bbs-cus-fieldset-valid-form']]: true,
                              [textFieldStyle['bbs-cus-material-ui']]: !props.outlined,
                              [textFieldStyle['bbs-cus-bootstrap-ui']]: props.outlined,
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
                {props.label}
            </span>
                </fieldset>
                {
                    props.rows
                        ?
                        <textarea
                            ref={inputRef}
                            className={clx({
                                [textFieldStyle['bbs-cus-valid-field']]: true,
                                [textFieldStyle['auto-height-textarea-root']]: props.autoHeight
                            })}
                            rows={props.rows}
                            placeholder={props.placeholder}
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
                            placeholder={props.placeholder}
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
