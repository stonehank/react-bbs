import React, {useContext} from 'react';
import ListRender from "./ListRender";
import MoreButton from "./MoreButton";
import Loading from "../UI/Loading";
import ReplyUpdateContext from "../../context/replys/ReplyUpdateContext";
import useListData from "../../hooks/useListData";
import {FetchCommentParams, FetchCommentResult, SingUserInfo} from "../../types";

type Params={
    uniqStr:string,
    maxNest:number,
    editable:boolean,
    pageSize:number,
    fetchComments:(params:FetchCommentParams)=>Promise<FetchCommentResult>,
    fetchCurrentUser:()=>Promise<SingUserInfo>
}
const CommentsList=React.forwardRef((props:Params,forwardRef)=>{
    const {
        uniqStr,
        maxNest,
        editable,
        pageSize,
        fetchComments,
        fetchCurrentUser,
    }=props
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

    React.useImperativeHandle(forwardRef,()=>({
        updateList,
        updateReply
    }))

    if(loading || userLoading){
        return(
            <div className="text-center" >
                <Loading size={48} />
            </div>
        )
    }

    return (
        <section>
            <p className={"text-md"}>
                评论数：<span>{total > 999 ? '999+' : total}</span>
            </p>
            <ListRender
                // define current layer
                curNest={0}
                maxNest={maxNest}
                updateCommentAsync={updateCommentAsync}
                list={list}
                loadList={loadList}
            />
            {
                noMoreData && list.length === 0
                    ?
                    <p className={"text-center text-secondary"}>还没有任何评论~</p>
                    :
                    <MoreButton
                        noMoreData={noMoreData}
                        loadMore={loadMore}
                    />
            }

        </section>
    );
})

export default CommentsList;
