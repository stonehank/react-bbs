import React from 'react';
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
