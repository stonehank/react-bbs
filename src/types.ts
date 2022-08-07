export interface APICoreInterface {
  serverInit(): Promise<any>;
  fetchComments_server(uniqStr: string): Promise<any>;
  fetchCounts_server(uniqStr: string, includeReply?: boolean): Promise<any>;
  fetchPageViews_server(uniqStr: string, title?:string): Promise<any>;
  uploadComment_server(uploadField: UploadFiled): Promise<any>;
  updateComment_server(id:string, message:string): Promise<any>;
  signIn_server(): Promise<any>;
  signUp_server(): Promise<any>;
}

export interface ConvertLayerIInterface {
  initialLoading: boolean;
  fetchPageViews:(uniqStr:string)=>Promise<number>;
  fetchCounts:(uniqStr:string)=>Promise<number>;
  updateComment: (id: string, message: string) => Promise<CommentObject>;
  uploadComment:(uploadField:UploadFiled)=>Promise<CommentObject>;
  fetchCurrentUser:()=>Promise<SignUserInfo>;
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


export type ReplyInfo = {
  at: string;
  rootId: string;
  replyId: string;
}

export type UserInfo = {
  avatar: string;
  nickname: string;
  email: string;
}

export type UploadFiled={
  uniqStr:string;
  message:string;
} & ReplyInfo & UserInfo;

export type CommentObject = {
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
}


export type SignUserInfo = {
  id: string;
  username?: string;
  sessionToken?: string;
  email?: string;
}

export type FetchCommentParams = {
  uniqStr: string;
  rootId: string;
  replyId: string;
  page: number;
  pageSize: number;
  deepReply: boolean;
  deepReplyCounts: number;
}

export type FetchCommentResult = {
  data: CommentObject[];
  total: number;
}
export interface BBSCounterProps{
  uniqStr?:string
}
export interface BBSPageViewProps{
  uniqStr?:string
}
export interface BBSPanelParams  {
  pageSize?: number;
  nest?: number;
  offset?: number;
  uniqStr?: string;
}

export type configType = {
  apiKey?: string | null;
  projectId?: string | null;
  appId?: string | null;
  appKey?: string | null;
  serverURLs?: string | null;
  editMode?: boolean;
  CommentClass?: string;
  CounterClass?: string;
  server?:  'firebase' | 'leancloud';
}

export type stableConfigType = {
  UserClass: string;
  initialLoading: boolean;
  countMap: any;
  pageviewMap: any;
}
