import React from 'react';
declare type EmailProps = {
    email: string;
    setEmail: (email: string) => void;
    [x: string]: any;
};
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<EmailProps, keyof EmailProps> & React.RefAttributes<unknown>>>;
export default _default;
