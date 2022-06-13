import React from 'react';
import cls from 'classnames'
import buttonStyle from './button.module.scss'
import Loading from "../Loading";

const Button = React.forwardRef((props,ref)=>{
    return (
        <button
            ref={ref}
            onClick={props.onClick}
            className={cls({
                [buttonStyle['bbs-btn']]:true,
                [buttonStyle[props.color+'-color']]:!!props.color,
                [buttonStyle['bbs-btn-text']]:props.text,
                [buttonStyle['no-gap']]:props.dense,
                [buttonStyle['bbs-disabled']]:props.disabled,
                [buttonStyle['bbs-btn-loading']]:props.loading
            })}
            style={props.style}
        >
            {
                props.loading ? <Loading size={22} /> : props.children
            }
        </button>
    );
})

export default Button;
