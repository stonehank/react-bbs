import React from 'react';
declare type AvatarProps = {
    avatar: string;
    email: string;
    nickname: string;
    size: number;
    setAvatar: any;
};
declare function Avatar(props: AvatarProps): JSX.Element;
declare namespace Avatar {
    var defaultProps: {
        size: number;
        email: string;
        nickname: string;
        avatar: any;
    };
}
declare const _default: React.MemoExoticComponent<typeof Avatar>;
export default _default;
