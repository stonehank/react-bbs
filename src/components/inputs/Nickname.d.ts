import React from 'react';
declare type NicknameProps = {
    nickname: string;
    setNickname: (email: string) => void;
    [x: string]: any;
};
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<NicknameProps, keyof NicknameProps> & React.RefAttributes<unknown>>>;
export default _default;
