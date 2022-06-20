import React, {useContext, useMemo, useRef, useState} from 'react';
import CommentContext from "../comments/CommentContext";
import cloneDeep from "clone-deep";
import scrollToEle from "../../utils/DOM/scrollToEle";
import messageBodyStyle from "../../components/comments/MessageCard/scss/message-body.module.scss";
import highLightEle from "../../utils/DOM/highLightEle";
import ReplyContext from "./ReplyContext";
import configMethods from '../../config'
import useSyncState from "../../hooks/useSyncState";
import useDidUpdate from "../../hooks/useDidUpdate";
import {CommentObject} from "../../types";
const {readLoggedUser} = configMethods



function ReplyProvider(props) {
    const {
        small,
        details,
        loadList,
        updateCommentAsync,
        curNest,
        maxNest,
    }:{
        small:boolean,
        details:CommentObject,
        loadList:(parameters:any)=>Promise<{data:CommentObject[],total:number}>,
        updateCommentAsync:(id:string,updatedData:CommentObject)=>void,
        curNest:number,
        maxNest:number
    } = props
    const {startReply, updateReplyDetails, updateComment}=useContext(CommentContext)
    const editMessageRef=useRef(null)
    const [replyCounts, setReplyCounts]=useState<number>(details.replyCounts || 0)
    const [replyLoading, setReplyLoading]=useState(false)
    const [showReply, setShowReply]=useState(false)
    const [replyList, syncReplyList,setReplyList]=useSyncState<CommentObject[]>([])
    const [replyPage, setReplyPage]=useState(1)
    const [nodata, setNodata]=useState(false)
    const [edit, setEdit]=useState(false)
    const [editMessage, setEditMessage]=useState(details.message)
    function showEdit(){
        setEdit(true)
        setEditMessage(details.message)
    }

    function closeEdit(){
        setEdit(false)
        setEditMessage(details.message)
    }


    const loggedUser = readLoggedUser()
    const canRenderReplyBtn=useMemo(()=>curNest<maxNest,[curNest,maxNest])
    const isOwnerComment=useMemo(()=>loggedUser && loggedUser.id!=null && loggedUser.id===details.user_id,[loggedUser,details.user_id])
    // useCallback(()=>{
    //
    // },[updateReplyDetails])

    useDidUpdate(()=>{
        console.log(updateReplyDetails,'update Reply')
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
    function saveEdit(){
        if(!validate())return
        let id=details.objectId
        updateComment(id,editMessage)
        .then(data=>{
            if(!data)return
            closeEdit()
            updateCommentAsync(id,data)
        })
    }
    function updateCommentInReplyAsync(id,data){
        let replyData=syncReplyList.current.find(obj=>obj.objectId===id)
        if(replyData){
            replyData.message=data.message
            replyData.updatedAt=data.updatedAt
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

    function insertEmoji(emoji) {
        editMessageRef.current.insertToValue(emoji)
    }

    function validate() {
        return editMessageRef.current.validate()
    }

    return (
        <ReplyContext.Provider value={{
            small,
            details,
            loadList,
            updateCommentInReplyAsync,
            curNest,
            maxNest,
            startReply,
            replyCounts,
            replyLoading,
            showReply,
            replyList,
            replyPage,
            nodata,
            edit,
            editMessage,
            canRenderReplyBtn,
            isOwnerComment,
            editMessageRef,

            insertEmoji,
            showEdit,
            closeEdit,
            saveEdit,
            toggleReplyList,
            fetchMore
        }}>
            {props.children}
        </ReplyContext.Provider>
    )
}

export default ReplyProvider;
