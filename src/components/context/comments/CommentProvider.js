import React, {useState, useEffect} from 'react';
import CommentContext from "./CommentContext";
import useConvertLayer from "../../../server-layer/leancloud/ConvertLayer";
import bindATagSmoothScroll from "../../../utils/DOM/bindATagSmoothScroll";
import cloneDeep from "clone-deep";
import configMethods from '../../../config'
const {readConfig} = configMethods
const { countMap} = readConfig()

function CommentProvider(props) {
    const {maxNest, uniqStr, pageSize, editable, startReply} = props
    const {fetchComments, fetchCurrentUser} = useConvertLayer()
    const [loading, setLoading] = useState(true)
    const [userLoading, setUserLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [list, setList] = useState([])
    const [total, setTotal] = useState(null)
    const [noMoreData, setNoMoreData] = useState(true)


    useEffect(()=>{
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
    function updateList(){
        let newList = cloneDeep(list)
        newList.unshift(data)
        setList(newList)
        setTotal(total + 1)
    }

    // 更新reply
    function updateReply({replyId,rootId}){
        loadData()
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
            page:page,
            deepReply:maxNest <=0,
            deepReplyCounts:maxNest <= 1,
        })
        .then(({data,total})=>{
            console.log(data,total)
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

    function updateCommentAsync(id,editData){
        let data=list.find(obj=>obj.objectId===id)
        if(data){
            data.message=editData.message
            data.updatedAt=editData.updatedAt
        }
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
            loadMore,
            loadList,
            updateCommentAsync,
            updateList,
            updateReply,
            startReply
        }}>
            {props.children}
        </CommentContext.Provider>
    );
}

export default CommentProvider;
