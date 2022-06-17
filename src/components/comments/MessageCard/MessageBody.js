import React,{useMemo, useRef, useState, useContext} from 'react';
import messageBodyStyle from './message-body.module.scss'
import clx from 'classnames'
import PropTypes from 'prop-types'
import cloneDeep from 'clone-deep'
import configMethods from '../../../config'
import useConvertLayer from "../../../server-layer/leancloud/ConvertLayer";
import scrollToEle from "../../../utils/DOM/scrollToEle";
import highLightEle from "../../../utils/DOM/highLightEle";
import MessageInput from "../../inputs/MessageInput";
import ActionsBar from "../../actions/ActionsBar";
import Button from "../../UI/Button";
import MessageRender from "./MessageRender";
import ListRender from "../ListRender";
import Loading from "../../UI/Loading";
import MoreButton from "../MoreButton";
import CommentContext from "../../context/comments/CommentContext";
const {readLoggedUser} = configMethods


function MessageBody(props) {
    const {
        small,
        details,
        loadList,
        updateCommentAsync,
        curNest,
        maxNest,
    } = props
    const {startReply}=useContext(CommentContext)
    const editMessageRef=useRef(null)
    const {updateComment} = useConvertLayer()
    const [replyCounts, setReplyCounts]=useState(details.replyCounts || 0)
    const [replyLoading, setReplyLoading]=useState(false)
    const [showReply, setShowReply]=useState(false)
    const [replyList, setReplyList]=useState([])
    const [replyPage, setReplyPage]=useState(1)
    const [nodata, setNodata]=useState(false)
    const [edit, setEdit]=useState(false)
    const [editMessage, setEditMessage]=useState(details.message)

    const loggedUser = readLoggedUser()
    const canRenderReplyBtn=useMemo(()=>curNest<maxNest,[curNest,maxNest])
    const isOwnerComment=useMemo(()=>loggedUser && loggedUser.id!=null && loggedUser.id===details.user_id,[loggedUser,details.user_id])
    // useCallback(()=>{
    //     if(!newData)return
    //     let {replyId,rootId}=newData
    //     // 不同祖先，彻底没关系
    //     if(rootId!==(details.rootId || details.objectId))return
    //     // 已经过了最大嵌套层，不必更新
    //     if(maxNest===curNest)return
    //     // 查看replyId和objectId相等时更新
    //     if(replyId===details.objectId){
    //         // console.log(1)
    //         updateDataAfterReply()
    //     }else if(maxNest===curNest + 1  && replyList.find(obj=>obj.objectId===replyId)){
    //         // 下一层是最大嵌套数
    //         // console.log(2)
    //         updateDataAfterReply()
    //     }
    // },[needUpdateData])


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
        let replyData=replyList.find(obj=>obj.objectId===id)
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
            let replyId=replyList[0].objectId
            let ele=document.getElementById(replyId).getElementsByClassName(messageBodyStyle['bbs-msg-body'])[0]
            if(!ele)return
            highLightEle(ele)
        })
    }

    function insertEmoji(emoji) {
        editMessageRef.current.insertToValue(emoji)
    }

    function showEdit(){
        setEdit(true)
        setEditMessage(details.message)
    }

    function closeEdit(){
        setEdit(false)
        setEditMessage(details.message)
    }

    function validate() {
        return editMessageRef.current.validate()
    }

    return (
        <div
            className={clx(messageBodyStyle["bbs-msg-wrapper"],{
                [messageBodyStyle["msg-small"]]: small,
            })}
        >
            <div
                className={clx(messageBodyStyle["bbs-msg-body"],{
                    [messageBodyStyle["msg-small"]]: small,
                })}
            >
                {!edit
                    ?
                    <MessageRender details={details}/>
                    :
                    <div>
                        <MessageInput
                            ref={editMessageRef}
                            label={"编辑内容"}
                            rows={3}
                        />
                        <ActionsBar
                            message={editMessage}
                            insertEmoji={insertEmoji}
                            replyId={details.replyId}
                            at={details.at}
                        />
                    </div>
                }

            </div>
            <div
                className={clx({
                    [messageBodyStyle["bbs-msg-action"]]: true,
                    [messageBodyStyle["msg-small"]]: small,
                })}
            >
                {
                    edit && isOwnerComment
                        ?
                        <div className={messageBodyStyle['bbs-msg-action-edit']}>
                            <Button
                                dense
                                text
                                className="mr-4"
                                onClick={closeEdit}
                            >
                                取消
                            </Button>
                            <Button
                                dense
                                text
                                color="success"
                                className="mr-4"
                                onClick={saveEdit}
                            >
                                保存
                            </Button>
                        </div>
                        :
                        <div className={messageBodyStyle['bbs-msg-action-no-edit']}>
                            {
                                isOwnerComment
                                    ?
                                    <Button
                                        dense
                                        text
                                        className="mr-4"
                                        onClick={showEdit}
                                    >
                                        编辑
                                    </Button>
                                    :
                                    null
                            }
                            <Button
                                dense
                                text
                                className="mr-4"
                                color="info"
                                onClick={() => startReply({
                                    rootId: details.rootId || details.objectId,
                                    replyId: details.objectId,
                                    replyName: details.nickname,
                                })}
                            >
                                回复
                            </Button>


                        </div>
                }
                {
                    canRenderReplyBtn
                    &&
                    <span className={messageBodyStyle['bbs-reply-btn']}>
                            {
                                replyCounts > 0 &&
                                <Button dense onClick={toggleReplyList} text>
                                    {
                                        showReply ? <span>收起评论</span> : <span>{replyCounts}条评论</span>
                                    }
                                </Button>
                            }

                        </span>
                }

            </div>
            {
                showReply && canRenderReplyBtn
                &&
                <div>
                    {replyLoading ? <Loading size={32}/> : null}
                    <ListRender
                        className={clx('mt-2', 'pl-1', messageBodyStyle['bbs-reply-wrapper'])}
                        curNest={curNest + 1}
                        maxNest={maxNest}
                        list={replyList}
                        updateCommentAsync={updateCommentInReplyAsync}
                        loadList={loadList}
                    />
                    {
                        !replyLoading && replyCounts > replyList.length
                        &&
                        <MoreButton
                            align={"left"}
                            simple={true}
                            nodata={nodata}
                            loadMore={fetchMore}
                        />
                    }

                </div>
            }
        </div>

    );
}
MessageBody.propTypes={
    small:PropTypes.bool,
    details:PropTypes.object,
    loadList:PropTypes.func,
    updateCommentAsync:PropTypes.func,
    curNest:PropTypes.number,
    maxNest:PropTypes.number,
}

export default MessageBody;
