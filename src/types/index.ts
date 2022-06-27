export interface APICoreInterface {
    serverInit,
    fetchComments_server,
    fetchCounts_server,
    fetchPageViews_server,
    uploadComment_server,
    updateComment_server,
    signIn_server,
    signUp_server,
}

export interface ConvertLayerIInterface {
    initialLoading:boolean,
    fetchPageViews,
    fetchCounts,
    updateComment:(id:string,message:string)=>Promise<CommentObject>,
    uploadComment,
    fetchCurrentUser,
    fetchComments:(params:{
        uniqStr:string,
        rootId:string,
        replyId:string,
        page:number,
        pageSize:number,
        deepReply:boolean,
        deepReplyCounts:number,
    })=>Promise<{
        data:CommentObject[],
        total:number
    }>,
}


export type CommentObject={
    updatedAt:string,
    objectId:string,
    nickname:string,
    rootId:string,
    createdAt:string,
    replyId:string,
    at:string,
    avatar:string,
    user_id:string,
    message:string,
    replys:CommentObject[] | null,
    replyCounts:number,
}

export type ReplyInfo={
    at: string,
    rootId: string,
    replyId: string,
}

export type UserInfo={
    avatar: string,
    nickname: string,
    email: string,
}

export type ConfigInfo ={
    uniqStr:string,
    nest?:number,
    pageSize?:number,
    offset?:number,
    editable?:boolean
}

export type SingUserInfo={
    id:string,
    sessionToken:string,
    username:string,
}

export type FetchCommentParams={
    uniqStr:string,
    rootId:string,
    replyId:string,
    page:number,
    pageSize:number,
    deepReply:boolean,
    deepReplyCounts:number,
}

export type FetchCommentResult={
    data:CommentObject[],
    total:number
}

export type BBSPanelParams={
    editable:boolean,
    pageSize:number,
    nest:number,
    offset:number,
    uniqStr: string
}
