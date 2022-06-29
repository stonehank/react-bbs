import React from 'react';
declare type Props = {
    canRenderReplyBtn: boolean;
    replyCounts: number;
    showReply: boolean;
    toggleReplyList: () => void;
};
declare function ReplyListCount({ canRenderReplyBtn, replyCounts, showReply, toggleReplyList }: Props): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof ReplyListCount>;
export default _default;
