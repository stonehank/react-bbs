import React from 'react';
import { FetchCommentParams, FetchCommentResult, SingUserInfo } from '../../types';
declare type Props = {
    uniqStr: string;
    maxNest: number;
    editable: boolean;
    pageSize: number;
    fetchComments: (params: FetchCommentParams) => Promise<FetchCommentResult>;
    fetchCurrentUser: () => Promise<SingUserInfo>;
};
declare const Comments: React.ForwardRefExoticComponent<Props & React.RefAttributes<unknown>>;
export default Comments;
