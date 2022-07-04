import React from 'react';
declare type ButtonProps = {
    [x: string]: any;
    color?: string;
    onClick: (event: React.MouseEvent) => void;
    text?: boolean;
    dense?: boolean;
    disabled?: boolean;
    loading?: boolean;
    children?: any;
    className?: string;
    size?: 'x-small' | 'small' | 'normal';
};
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<ButtonProps, keyof ButtonProps> & React.RefAttributes<HTMLButtonElement>>>;
export default _default;
