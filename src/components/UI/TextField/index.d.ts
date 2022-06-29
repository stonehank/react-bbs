import React from 'react';
declare type Props = {
    value?: string;
    setValue?: React.Dispatch<string>;
    label?: string;
    rows?: number | null;
    placeholder?: string;
    rules?: any[];
    outlined?: boolean;
    autoHeight?: boolean;
    [x: string]: any;
};
declare const TextField: React.ForwardRefExoticComponent<Pick<Props, keyof Props> & React.RefAttributes<unknown>>;
export default TextField;
