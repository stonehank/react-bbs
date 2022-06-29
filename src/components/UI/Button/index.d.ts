import React from 'react';
declare type ButtonProps = {
    [x: string]: any;
    color?: 'error' | 'success' | 'info' | 'warning';
};
declare const Button: React.ForwardRefExoticComponent<Pick<ButtonProps, keyof ButtonProps> & React.RefAttributes<HTMLButtonElement>>;
export default Button;
