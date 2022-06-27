import React, {useContext, useImperativeHandle, useRef} from 'react';
import CommentsList from "./CommentsList";
import { FetchCommentParams, FetchCommentResult, SingUserInfo} from "../../types";
import ReplyUpdateContext from "../../context/replys/ReplyUpdateContext";
import useListData from "../../hooks/useListData";

type Props={
    uniqStr:string,
    maxNest:number,
    editable:boolean,
    pageSize:number,
    fetchComments:(params:FetchCommentParams)=>Promise<FetchCommentResult>,
    fetchCurrentUser:()=>Promise<SingUserInfo>,
}
const Comments=React.forwardRef(({
                                     uniqStr,
                                     maxNest,
                                     pageSize,
                                     fetchComments,
                                     fetchCurrentUser
}:Props,commentsRef)=>{

    const {
        loading,
        userLoading,
        list,
        total,
        noMoreData,
        loadMore,
        loadList,
        updateCommentAsync,
        updateList,
    }=useListData({uniqStr,maxNest,pageSize,fetchComments,fetchCurrentUser})

    const {
        updateReply,
    }=useContext(ReplyUpdateContext)

    React.useImperativeHandle(commentsRef,()=>({
        updateList,
        updateReply
    }))
    return (
        <CommentsList
            maxNest={maxNest}
            loading={loading}
            userLoading={userLoading}
            list={list}
            total={total}
            noMoreData={noMoreData}
            loadMore={loadMore}
            loadList={loadList}
            updateCommentAsync={updateCommentAsync}
        />
    );
})



export default Comments;
