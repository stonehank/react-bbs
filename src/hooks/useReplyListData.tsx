import React, {useState} from 'react';
import useSyncState from "./useSyncState";
import {CommentObject} from "../types";
import cloneDeep from "clone-deep";
import messageBodyStyle from "../components/comments/MessageCard/scss/message-body.module.scss";
import useDidUpdate from "./useDidUpdate";
import scrollToEle from "../utils/DOM/scrollToEle";
import highLightEle from "../utils/DOM/highLightEle";


function useReplyListData({details,curNest,maxNest,loadList,updateReplyDetails,updateCommentAsync}) {
    const [replyPage, setReplyPage]=useState(1)
    const [replyList, syncReplyList,setReplyList]=useSyncState<CommentObject[]>([])
    const [nodata, setNodata]=useState(false)
    const [replyCounts, setReplyCounts]=useState<number>(details.replyCounts || 0)
    const [replyLoading, setReplyLoading]=useState(false)
    const [showReply, setShowReply]=useState(false)

    useDidUpdate(()=>{
        if(!updateReplyDetails)return
        let {replyId,rootId}=updateReplyDetails
        // 不同祖先，彻底没关系
        if(rootId!==(details.rootId || details.objectId))return
        // 已经过了最大嵌套层，不必更新
        if(maxNest===curNest)return
        // 查看replyId和objectId相等时更新
        if(replyId===details.objectId){
            // console.log(1)
            updateDataAfterReply()
        }else if(maxNest===curNest + 1  && syncReplyList.current.find(obj=>obj.objectId===replyId)){
            // 下一层是最大嵌套数
            // console.log(2)
            updateDataAfterReply()
        }
    },[updateReplyDetails])

    function toggleReplyList(){
        if(showReply){
            setShowReply(false)
            setReplyList([])
            return Promise.resolve()
        }else{
            setReplyLoading(true)
            setShowReply(true)
            return loadData()
                .finally(()=> setReplyLoading(false))
        }
    }

    function loadData(){
        let params={
            replyId:details.objectId,
            page:replyPage,
            deepReply:curNest + 1 === maxNest,
            deepReplyCounts:curNest + 2 >= maxNest,
        }
        return loadList(params)
            .then(({data})=>{
                if(data.length===0){
                    setNodata(true)
                }else{
                    setReplyList(cloneDeep(data))
                }
            })
    }

    function updateCommentInReplyAsync(id,data){
        let idx=syncReplyList.current.findIndex(obj=>obj.objectId===id)
        let newReplyList=replyList.slice()
        if(idx!==-1){
            newReplyList[idx]={
                ...newReplyList[idx],
                message:data.message,
                updatedAt:data.updatedAt
            }
            setReplyList(newReplyList)
        }else{
            updateCommentAsync(id,data)
        }
    }

    function fetchMore(){
        setReplyPage(replyPage+1)
        return loadData()

    }

    function updateDataAfterReply(){
        let next
        if(!showReply){
            next=toggleReplyList()
        }else{
            next=loadData()
        }
        next.then(()=>{
            setReplyCounts(replyCounts+1)
            return scrollToEle(document.getElementById(details.objectId),{
                highlight:false,
                smooth:true
            })
        })
            .then(()=>{
                setTimeout(()=>{
                    let replyId=syncReplyList.current[0].objectId
                    let ele=document.getElementById(replyId).getElementsByClassName(messageBodyStyle['bbs-msg-body'])[0]
                    if(!ele)return
                    highLightEle(ele)
                },100)
            })
    }

    return {
        replyPage,
        replyList,
        nodata,
        replyCounts,
        replyLoading,
        showReply,

        toggleReplyList,
        fetchMore,
        updateCommentInReplyAsync
    }
}

export default useReplyListData;
