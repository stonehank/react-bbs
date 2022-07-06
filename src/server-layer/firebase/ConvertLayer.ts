import { useEffect, useState, useRef, useCallback } from 'react';
import { readConfig, setLoggedUser } from '../../config'
import useAPICore from './APICore'
import {
  CommentObject,
  ConvertLayerIInterface,
  FetchCommentParams,
  FetchCommentResult,
  SingUserInfo
} from '../../types'
import cloneDeep from 'clone-deep'

/**
 * STEP1: 一次性获取1000个数据
 * STEP2: 转换为嵌套数据, 并且计算回复数
 * STEP3: 根据参数要求提供对应的数据展示
 * 更少的API调用，但是会获取更多的数据
 */
export default function useConvertLayer(): ConvertLayerIInterface {
  const [initialLoading, setInitialLoading] = useState(true)
  const noMoreRemoteData=useRef(false)
  const waitNextInserted=useRef([])
  const checkOnNextInsert=useRef<boolean>(false)
  const allCommentData = useRef<CommentObject[]>([])
  const objectIdToData = useRef<{ [key: string]: CommentObject }>({})
  const { pageviewMap, countMap } = readConfig()
  const {
    serverInit,
    signIn_server,
    fetchCounts_server,
    fetchPageViews_server,
    updateComment_server,
    uploadComment_server,
    fetchComments_server
  } = useAPICore()

  useEffect(() => {
    serverInit().then(() => setInitialLoading(false))
  }, [])

  /**
   * Required
   */
  const fetchPageViews=useCallback(function(uniqStr) {
    return fetchPageViews_server(uniqStr).then((counts) => {
      pageviewMap.set(uniqStr, counts)
      return counts
    })
  },[])

  /**
   * Required
   */
  const fetchCounts=useCallback(function (uniqStr) {
    return fetchCounts_server(uniqStr).then((counts) => {
      countMap.set(uniqStr, counts)
      return counts
    })
  },[])

  /**
   * Required
   */
  const updateComment=useCallback(function(id, message) {
    console.log(id, message, '------------2')
    return updateComment_server(id, message).then((data) => {
      if (!data) return null
      __updateCommentAfterEdit__(id, data)
      return data
    })
  },[])

  /**
   * Required
   */
  const uploadComment=useCallback(function(uploadField) {
    return uploadComment_server(uploadField)
      .then((data) => {
        if (!data) return null
        if (!data.replyId) {
          const count = countMap.get(data.uniqStr)
          countMap.set(data.uniqStr, count + 1)
        }
        __insertInToList__(allCommentData.current, data)
        return data
      })
      .catch((err) => {
        console.error(err)
        return null
      })
  },[])

  /**
   * Required
   */
  const fetchCurrentUser=useCallback(function(): Promise<SingUserInfo> {
    return signIn_server().then((user) => {
      const simpleUser: SingUserInfo = {
        id: user.uid,
        email: user.email
      }
      setLoggedUser(simpleUser)
      return simpleUser
    })
  },[])

  /**
   * Required
   * @param params
   * @returns {Promise<Object>} {data, total}
   */
  const fetchComments=useCallback(function(params: FetchCommentParams): Promise<FetchCommentResult> {
    /*
            uniqStr         // 页面唯一值
            rootId          // rootId， 用于插入数据
            replyId         // 存在则搜索对应replyId的数据
            page            // 数据页码
            pageSize        // 数据每页条数
            deepReply       // Boolean, 存在则深度搜索每一个回复（嵌套回复）
            deepReplyCounts // 存在则深度搜索回复数量
         */
    const { uniqStr, replyId, pageSize, page, deepReply, deepReplyCounts } = params
    let data: Promise<CommentObject[]>
    // setCheckOnNextInsert(true)
    checkOnNextInsert.current=true
    if (!replyId && !noMoreRemoteData.current) {
      data = __getMoreData__(uniqStr)
    } else {
      data = Promise.resolve(allCommentData.current)
    }
    return data.then((nestedData) => {
      let filterData = nestedData
      if (replyId) {
        filterData = objectIdToData.current[replyId].replys
        if (deepReply) {
          filterData = __deepSearchReply__(filterData)
        }
      } else {
        if (deepReply) {
          filterData = Object.values(objectIdToData.current)
        }
      }
      filterData = filterData.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      // 这里获取从0到当前page的所有评论
      let result: CommentObject[] = cloneDeep(filterData.slice(0, pageSize * page))
      if (deepReplyCounts) {
        __deepSearchReplyCount__(result)
      }
      result = result.map((obj) => {
        obj.replys = null
        return obj
      })

      return new Promise((res) => {
        setTimeout(() => {
          res({
            data: result,
            /* 在max-nest为0的情况下，result是扁平的可能会更长 */
            total: Math.max(allCommentData.current.length, result.length, filterData.length)
          })
        }, 200)
      })
    })
  },[])

  function __updateCommentAfterEdit__(objectId, editData) {
    // let comment=objectIdToData.current[objectId]
    objectIdToData.current[objectId].message = editData.message
    objectIdToData.current[objectId].updatedAt = editData.updatedAt
  }

  function __insertInToList__(list, data) {
    // 插入到对应的嵌套层，同时也要更新replyCounts数字
    if (data.replyId) {
      const replyData = objectIdToData.current[data.replyId]
      if (replyData.replys == null) {
        replyData.replys = []
        replyData.replyCounts = 0
      }
      replyData.replys.unshift(data)
      replyData.replyCounts++
    } else {
      list.unshift(data)
    }
    objectIdToData.current[data.objectId] = data
  }

  function __getMoreData__(uniqStr: string): Promise<CommentObject[]> {
    console.log('mock network')
    return fetchComments_server(uniqStr)
      .then((flatList) => {
        noMoreRemoteData.current = flatList.length < 1000
        return flatList
      })
      .then(__generateIndexSearch__)
      .then(__mergeToNest__)
      .then(__generateReplyCounts__)
  }

  function __deepSearchReply__(allReplyList): CommentObject[] {
    let res: CommentObject[] = []
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

  function __mergeToNest__(newFetchList): CommentObject[] {
    if (checkOnNextInsert.current) {
      newFetchList = newFetchList.concat(waitNextInserted.current)
      // setWaitNextInserted([])
      waitNextInserted.current=[]
      // setCheckOnNextInsert(false)
      checkOnNextInsert.current=false
    }
    const replyCandid: CommentObject[] = []
    let newAllCommentData = allCommentData.current.slice()
    for (const item of newFetchList) {
      if (item.replyId) {
        replyCandid.push(item)
        continue
      }
      newAllCommentData.push(item)
    }
    replyCandid.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
    // DFS遍历arr
    for (const replyItem of replyCandid) {
      const res = __insertReplyItem__(newAllCommentData, replyItem)
      if (res.inserted) {
        newAllCommentData = res.list
      } else {
        waitNextInserted.current=[...waitNextInserted.current,replyItem]
        // setWaitNextInserted([...waitNextInserted, replyItem])
      }
    }
    allCommentData.current = newAllCommentData
    return newAllCommentData
  }

  function __generateReplyCounts__(list) {
    for (const item of list) {
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
    for (const item of list) {
      objectIdToData.current[item.objectId] = item
    }
    return list
  }

  function __insertReplyItem__(
    allList: CommentObject[],
    item: CommentObject
  ): {
    list: CommentObject[];
    inserted: boolean;
  } {
    if (!allList || allList.length === 0) return { list: allList, inserted: false }
    allList.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    const { replyId, rootId } = item
    for (let i = 0; i < allList.length; i++) {
      const curDetectObj = allList[i]
      const detectObjRootId = curDetectObj.rootId || curDetectObj.objectId
      if (detectObjRootId !== rootId) continue
      if (curDetectObj.objectId === replyId) {
        if (curDetectObj.replys == null) curDetectObj.replys = []
        curDetectObj.replys.push(item)
        return { list: allList, inserted: true }
      } else {
        const res = __insertReplyItem__(curDetectObj.replys, item)
        if (res.inserted) {
          curDetectObj.replys = res.list
          return { list: allList, inserted: true }
        }
      }
    }
    return { list: allList, inserted: false }
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
