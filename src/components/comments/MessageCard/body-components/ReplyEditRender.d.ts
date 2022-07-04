import React from 'react';
import { CommentObject } from '../../../../types';
declare type Props = {
    details: CommentObject;
    edit: boolean;
    small: boolean;
    editMessage: string;
    editMessageRef: any;
    setEditMessage: React.Dispatch<any>;
    insertEmoji: (emoji: any) => void;
};
declare function ReplyEditRender({ details, edit, small, editMessage, setEditMessage, editMessageRef, insertEmoji }: Props): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof ReplyEditRender>;
export default _default;
