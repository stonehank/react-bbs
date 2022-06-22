import React, {useState, useEffect, useRef} from 'react';
import CommentContext from "./CommentContext";
import bindATagSmoothScroll from "../../utils/DOM/bindATagSmoothScroll";
import cloneDeep from "clone-deep";
import configMethods from '../../config'
import useSyncState from "../../hooks/useSyncState";
import useDidUpdate from "../../hooks/useDidUpdate";
import {CommentObject} from "../../types";
const {readConfig} = configMethods
const { countMap} = readConfig()

function CommentProvider(props) {
    const {maxNest, uniqStr, pageSize, editable, startReply,updateComment,fetchComments, fetchCurrentUser} = props
    const [loading, setLoading] = useState(true)
    const [userLoading, setUserLoading] = useState(true)
    const [page, syncPage,setPage] = useSyncState(1)
    const [list, syncList,setList] = useSyncState<CommentObject[]>([])
    const [total, setTotal] = useState(null)
    const [noMoreData, setNoMoreData] = useState(true)
    const updateReplyDetails=useRef<{rootId:string,replyId:string} | null>(null)


    useDidUpdate(()=>{
        reload()
    },[maxNest, pageSize])

    useEffect(()=>{
        /** 流程
         * 获取数据-> 回复
         * 获取数据-> count
         * 根据maxNest，editable, pageSize，分页方式进行渲染
         * */
        init()
        document.addEventListener('click',bindATagSmoothScroll)
        return ()=>{
            document.removeEventListener('click',bindATagSmoothScroll)
        }
    },[])

    // 更新list
    function updateList(data){
        let newList = cloneDeep(list)
        newList.unshift(data)
        setList(newList)
        setTotal(total + 1)
    }

    // 更新reply
    function updateReply({replyId,rootId}){
        console.log('updateReply',replyId,rootId)
        updateReplyDetails.current={replyId,rootId}
        // setNeedUpdateReply({replyId,rootId})
    }

    function init(){
        setLoading(true)
        setUserLoading(true)
        loadData()
        fetchCurrentUser()
        .finally(()=>setUserLoading(false))
    }

    function loadData(){
        return loadList({
            page:syncPage.current,
            deepReply:maxNest <=0,
            deepReplyCounts:maxNest <= 1,
        })
        .then(({data,total})=>{
            setList(cloneDeep(data))
            let newTotal=countMap.has(uniqStr)
                ? countMap.get(uniqStr)
                : total
            setTotal(newTotal)
            setNoMoreData(data.length >= newTotal)
        })
        .finally(()=>setLoading(false))
    }

    function reload(){
        if(loading)return
        setPage(1)
        setList([])
        setLoading(true)
        loadData()
    }

    function loadList(parameters){
        let params={
            uniqStr:uniqStr,
            pageSize:+pageSize,
            ...parameters
        }
        return fetchComments(params)
    }

    function loadMore(){
        setPage(page + 1)
        return loadData()
    }

    function updateCommentAsync(id,updatedData){
        let data=syncList.current.find(obj=>obj.objectId===id)
        if(data){
            data.message=updatedData.message
            data.updatedAt=updatedData.updatedAt
        }
        setList(syncList.current)
    }


    return (
        <CommentContext.Provider value={{
            maxNest,
            uniqStr,
            pageSize,
            editable,
            loading,
            userLoading,
            total,
            list,
            page,
            noMoreData,
            updateReplyDetails:updateReplyDetails.current,
            loadMore,
            loadList,
            updateCommentAsync,
            updateList,
            updateReply,
            startReply,
            updateComment
        }}>
            {props.children}
        </CommentContext.Provider>
    );
}


// CommentProvider.propTypes={
//     uniqStr: PropTypes.string,
//     pageSize: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number,
//     ]),
//     editable: PropTypes.bool,
//     maxNest: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number,
//     ]),
// }

function propsAreEqual(prevProps, nextProps) {
    // maxNest, uniqStr, pageSize, editable
    return prevProps.maxNest === nextProps.maxNest
        && prevProps.uniqStr === nextProps.uniqStr
        && prevProps.pageSize === nextProps.pageSize
        && prevProps.editable === nextProps.editable
}
const MemoizedCommentProvider = React.memo(CommentProvider, propsAreEqual);

export default MemoizedCommentProvider;
