import {useEffect, useState} from 'react'
import cloneDeep from 'clone-deep'
import ConvertLayerIInterface from "../../interface/ConvertLayerIInterface";
import configMethods from '../../config'
import useAPICore from "./APICore";
const {readConfig, setLoggedUser} = configMethods
const {pageviewMap, countMap} = readConfig()

/**
 * STEP1: 一次性获取1000个数据
 * STEP2: 转换为嵌套数据, 并且计算回复数
 * STEP3: 根据参数要求提供对应的数据展示
 * 更少的API调用，但是会获取更多的数据
 */
export default function useConvertLayer() : ConvertLayerIInterface{
    const [initialLoading, setInitialLoading] = useState(true)
    const [noMoreRemoteData, setNoMoreRemoteData] = useState(false)
    const [allCommentData, setAllCommentData] = useState([])
    const [objectIdToData, setObjectIdToData] = useState({})
    const [waitNextInserted, setWaitNextInserted] = useState([])
    const [checkOnNextInsert, setCheckOnNextInsert] = useState(false)
    const {serverInit,signIn_server,fetchCounts_server,fetchPageViews_server,updateComment_server,uploadComment_server,fetchComments_server} = useAPICore()
    useEffect(()=>{
        serverInit().then(()=>setInitialLoading(false))
    },[])

    /**
     * Required
     */
    function fetchPageViews (uniqStr){
        return fetchPageViews_server(uniqStr)
            .then(counts=>{
                pageviewMap.set(uniqStr,counts)
                return counts
            })
    }
    /**
     * Required
     */
    function fetchCounts(uniqStr){
        return fetchCounts_server(uniqStr)
            .then(counts=>{
                countMap.set(uniqStr,counts)
                return counts
            })
    }
    /**
     * Required
     */
    function updateComment(id,message){
        return updateComment_server(id,message)
            .then((data)=>{
                if(!data)return null
                __updateCommentAfterEdit__(id,data)
                return data
            })
    }
    /**
     * Required
     */
    function uploadComment(uploadField){
        return uploadComment_server(uploadField)
            .then(data=>{
                if(!data)return null
                if(!data.replyId){
                    let count=countMap.get(data.uniqStr)
                    countMap.set(data.uniqStr,count+1)
                }
                __insertInToList__(allCommentData,data)
                return data
            })
            .catch(_=>{
                return null
            })
    }
    /**
     * Required
     */
    function fetchCurrentUser(){
        return signIn_server()
            .then(user=>{
                let simpleUser=user
                if(user.attributes){
                    simpleUser={
                        id:user.id,
                        sessionToken:user.attributes.sessionToken,
                        username:user.attributes.username,
                    }
                }
                setLoggedUser(simpleUser)
                return simpleUser
            })
    }
    /**
     * Required
     * @param params
     * @returns {Promise<Object>} {data, total}
     */
    function fetchComments(params) {
        /*
            uniqStr         // 页面唯一值
            rootId          // rootId， 用于插入数据
            replyId         // 存在则搜索对应replyId的数据
            page            // 数据页码
            pageSize        // 数据每页条数
            deepReply       // Boolean, 存在则深度搜索每一个回复（嵌套回复）
            deepReplyCounts // 存在则深度搜索回复数量
         */
        let {uniqStr, replyId, pageSize, page, deepReply, deepReplyCounts} = params
        let data
        setCheckOnNextInsert(true)
        if (!replyId && !noMoreRemoteData) {
            data = __getMoreData__(uniqStr)
        } else {
            data = Promise.resolve(allCommentData)
        }
        return data.then((nestedData) => {
            let filterData = nestedData
            if (replyId) {
                filterData = objectIdToData[replyId].replys
                if (deepReply) {
                    filterData = __deepSearchReply__(filterData)
                }
            }else{
                if (deepReply) {
                    filterData = Object.values(objectIdToData)
                }
            }
            // 这里获取从0到当前page的所有评论
            let result = cloneDeep(filterData.slice(0, pageSize * page))
            if (deepReplyCounts) {
                __deepSearchReplyCount__(result)
            }
            result = result.map(obj => {
                obj.replys = null
                return obj
            }).sort((a,b)=>a.createdAt < b.createdAt ? 1 : -1)

            return new Promise(res => {
                setTimeout(() => {
                    res({
                        data:result,
                        total:Math.max(allCommentData.length,result.length,filterData.length)
                    })
                }, 200)
            })
        })
    }

    function __updateCommentAfterEdit__(objectId,editData){
        let comment=objectIdToData[objectId]
        comment.message=editData.message
        comment.updatedAt=editData.updatedAt
    }
    function __insertInToList__(list,data){
        // 插入到对应的嵌套层，同时也要更新replyCounts数字
        if(data.replyId){
            let replyData=objectIdToData[data.replyId]
            if(replyData.replys==null){
                replyData.replys=[]
                replyData.replyCounts=0
            }
            replyData.replys.unshift(data)
            replyData.replyCounts++
        }else{
            list.unshift(data)
        }
        objectIdToData[data.objectId]=data
    }
    function __getMoreData__(uniqStr) {
        console.log('mock network')
        return fetchComments_server(uniqStr)
            .then(flatList=>{
                setNoMoreRemoteData(flatList.length < 1000)
                return flatList
            })
            .then(__generateIndexSearch__)
            .then(__mergeToNest__)
            .then(__generateReplyCounts__)
    }
    function __deepSearchReply__(allReplyList) {
        let res = []
        for (let i = 0; i < allReplyList.length; i++) {
            res.push(allReplyList[i])
            if (allReplyList[i].replys) {
                res = res.concat(__deepSearchReply__(allReplyList[i].replys))
            }
        }
        return res
    }
    function __deepSearchReplyCount__(allReplyList) {
        let allCounts = 0
        for (let i = 0; i < allReplyList.length; i++) {
            if (allReplyList[i].replys && allReplyList[i].replys.length > 0) {
                allReplyList[i].replyCounts = __deepSearchReplyCount__(allReplyList[i].replys)
                allCounts += allReplyList[i].replyCounts + 1
            } else {
                allCounts += 1
            }
        }
        return allCounts
    }
    function __mergeToNest__(newFetchList) {
        if (checkOnNextInsert) {
            newFetchList = newFetchList.concat(waitNextInserted)
            setWaitNextInserted([])
            setCheckOnNextInsert(false)
        }
        let replyCandid = []
        for (let item of newFetchList) {
            if (item.replyId) {
                replyCandid.push(item)
                continue
            }
            setAllCommentData([...allCommentData,item])
        }
        replyCandid.sort((a, b) => a.createdAt < b.createdAt ? -1 : 1)
        // DFS遍历arr
        for (let replyItem of replyCandid) {
            let res = __insertReplyItem__(allCommentData, replyItem)
            if (res.inserted) {
                setAllCommentData(res.list)
            } else {
                setWaitNextInserted([...waitNextInserted,replyItem])
            }
        }
        return allCommentData
    }
    function __generateReplyCounts__(list) {
        for (let item of list) {
            if (item.replys && item.replys.length > 0) {
                item.replyCounts = item.replys.length
                __generateReplyCounts__(item.replys)
            } else {
                item.replyCounts = 0
            }
        }
        return list
    }
    function __generateIndexSearch__(list) {
        for (let item of list) {
            setObjectIdToData({
                ...objectIdToData,
                [item.objectId]:item
            })
        }
        return list
    }
    function __insertReplyItem__(allList, item) {
        if (!allList || allList.length === 0) return {list: allList, inserted: false}
        allList.sort((a,b)=>a.createdAt < b.createdAt ? 1 : -1)
        let {replyId, rootId} = item
        for (let i = 0; i < allList.length; i++) {
            let curDetectObj = allList[i]
            let detectObjRootId = curDetectObj.rootId || curDetectObj.objectId
            if (detectObjRootId !== rootId) continue
            if (curDetectObj.objectId === replyId) {
                if (curDetectObj.replys == null) curDetectObj.replys = []
                curDetectObj.replys.push(item)
                return {list: allList, inserted: true}
            } else {
                let res = __insertReplyItem__(curDetectObj.replys, item)
                if (res.inserted) {
                    curDetectObj.replys = res.list
                    return {list: allList, inserted: true}
                }
            }
        }
        return {list: allList, inserted: false}
    }

    return {
        initialLoading,
        fetchPageViews,
        fetchComments,
        fetchCounts,
        fetchCurrentUser,
        updateComment,
        uploadComment
    }

}



