/// <reference types="react" />
import { CommentObject } from '../../types';
declare type Props = {
    startReply: ({ rootId, replyId, replyName }: {
        rootId: any;
        replyId: any;
        replyName: any;
    }) => void;
    updateComment: (id: string, message: string) => Promise<CommentObject>;
    [x: string]: any;
};
declare function ReplyUpdateProvider({ children, startReply, updateComment }: Props): JSX.Element;
export default ReplyUpdateProvider;
