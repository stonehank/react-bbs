export interface APICoreInterface {
    serverInit: any;
    fetchComments_server: any;
    fetchCounts_server: any;
    fetchPageViews_server: any;
    uploadComment_server: any;
    updateComment_server: any;
    signIn_server: any;
    signUp_server: any;
}
export interface ConvertLayerIInterface {
    initialLoading: boolean;
    fetchPageViews: any;
    fetchCounts: any;
    updateComment: (id: string, message: string) => Promise<CommentObject>;
    uploadComment: any;
    fetchCurrentUser: any;
    fetchComments: (params: {
        uniqStr: string;
        rootId: string;
        replyId: string;
        page: number;
        pageSize: number;
        deepReply: boolean;
        deepReplyCounts: number;
    }) => Promise<{
        data: CommentObject[];
        total: number;
    }>;
}
export declare type CommentObject = {
    updatedAt: string;
    objectId: string;
    nickname: string;
    rootId: string;
    createdAt: string;
    replyId: string;
    at: string;
    avatar: string;
    user_id: string;
    message: string;
    replys: CommentObject[] | null;
    replyCounts: number;
};
export declare type ReplyInfo = {
    at: string;
    rootId: string;
    replyId: string;
};
export declare type UserInfo = {
    avatar: string;
    nickname: string;
    email: string;
};
export declare type ConfigInfo = {
    uniqStr: string;
    nest?: number;
    pageSize?: number;
    offset?: number;
    editable?: boolean;
};
export declare type SingUserInfo = {
    id: string;
    username?: string;
    sessionToken?: string;
    email?: string;
};
export declare type FetchCommentParams = {
    uniqStr: string;
    rootId: string;
    replyId: string;
    page: number;
    pageSize: number;
    deepReply: boolean;
    deepReplyCounts: number;
};
export declare type FetchCommentResult = {
    data: CommentObject[];
    total: number;
};
export declare type BBSPanelParams = {
    editable?: boolean;
    pageSize?: number;
    nest?: number;
    offset?: number;
    uniqStr?: string;
};
export declare type serverName = 'firebase' | 'leancloud';
export declare type configType = {
    apiKey?: string | null;
    projectId?: string | null;
    appId?: string | null;
    appKey?: string | null;
    serverURLs?: string | null;
    editMode?: boolean;
    CommentClass?: string;
    CounterClass?: string;
    server?: serverName;
};
export declare type stableConfigType = {
    UserClass: string;
    initialLoading: boolean;
    countMap: any;
    pageviewMap: any;
};
