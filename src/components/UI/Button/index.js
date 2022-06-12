import React from 'react';
import cls from 'classnames'
import './button.scss'
import Loading from "../Loading";

const Button = React.forwardRef((props,ref)=>{
    return (
        <button
            ref={ref}
            onClick={props.onClick}
            className={cls({
                'bbs-btn':true,
                [props.color+'-color']:!!props.color,
                'bbs-btn-text':props.text,
                'no-gap':props.dense,
                'bbs-disabled':props.disabled,
                'bbs-btn-loading':props.loading
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
