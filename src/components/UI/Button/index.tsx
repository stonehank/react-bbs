import React from 'react';
import cls from 'classnames'
import buttonStyle from './button.module.scss'
import Loading from "../Loading";

type ButtonProps={
    [x: string]: any;
    color?: 'error' |'success' | 'info' | 'warning';
}

const Button = React.forwardRef<HTMLButtonElement,ButtonProps>((props,ref)=>{
    const {onClick, color,text,dense,disabled,loading,children,className,...otherProps} = props
    return (
        <button
            ref={ref}
            onClick={onClick}
            className={cls(className,{
                [buttonStyle['bbs-btn']]:true,
                // @ts-ignore
                [buttonStyle[color+'-color']]:!!color,
                [buttonStyle['bbs-btn-text']]:text,
                [buttonStyle['no-gap']]:dense,
                [buttonStyle['bbs-disabled']]:disabled,
                [buttonStyle['bbs-btn-loading']]:loading,
            })}
            {...otherProps}
        >
            {
                loading ? <Loading size={22} /> : children
            }
        </button>
    );
})

export default Button;
