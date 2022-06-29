import React from 'react';
declare type Props = {
    message: string;
    replyId: string;
    at: string;
    insertEmoji: (emoji: string) => void;
};
declare function ActionsBar(props: Props): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof ActionsBar>;
export default _default;
