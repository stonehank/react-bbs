import React from 'react';
import {CommentObject} from "../../types";
interface CommentContextType{
    maxNest:string,
    uniqStr:string,
    pageSize:number,
    editable:boolean,
    loading:boolean,
    userLoading:boolean,
    total:number,
    list:CommentObject[],
    page:number,
    noMoreData:boolean,
    updateReplyDetails: { replyId:string,rootId:string } | null,
    loadMore:()=>void,
    loadList:(parameters:any)=>Promise<{data:CommentObject[],total:number}>,
    updateCommentAsync:(id:string,updatedData:CommentObject)=>void,
    updateList,
    updateReply,
    startReply,
    updateComment
}
const CommentContext = React.createContext<CommentContextType | null>(null)

export default CommentContext
