import { useCallback, useEffect, useState } from 'react'
import useSyncState from './useSyncState'
import useDidUpdate from './useDidUpdate'
import cloneDeep from 'clone-deep'
import bindATagSmoothScroll from '../utils/DOM/bindATagSmoothScroll'
import { readConfig } from '../config'
import { CommentObject, FetchCommentParams, FetchCommentResult, SignUserInfo } from '../types'
const { countMap } = readConfig()

export interface ListDataProps  {
  maxNest: number;
  uniqStr: string;
  pageSize: number;
  fetchComments: (params: FetchCommentParams) => Promise<FetchCommentResult>;
  fetchCurrentUser: () => Promise<SignUserInfo>;
}

export interface ListDataOutput {
  loading: boolean;
  userLoading: boolean;
  total: number;
  list: CommentObject[];
  noMoreData: boolean;
  loadMore: () => void;
  loadList: (parameters: any) => Promise<{ data: CommentObject[]; total: number }>;
  updateCommentAsync: (id: string, updatedData: CommentObject) => void;
  updateList: (data: CommentObject) => void;
}
function useListData({ maxNest, uniqStr, pageSize, fetchComments, fetchCurrentUser }: ListDataProps): ListDataOutput {
  const [loading, setLoading] = useState(true)
  const [userLoading, setUserLoading] = useState(true)
  const [page, syncPage, setPage] = useSyncState(1)
  const [list, setList] = useState<CommentObject[]>([])
  const [total, setTotal] = useState(null)
  const [noMoreData, setNoMoreData] = useState(true)
  useDidUpdate(() => {
    reload()
  }, [maxNest, pageSize])

  useEffect(() => {
    /** 流程
     * 获取数据-> 回复
     * 获取数据-> count
     * 根据maxNest，editable, pageSize，分页方式进行渲染
     * */
    init()
    document.addEventListener('click', bindATagSmoothScroll)
    return () => {
      document.removeEventListener('click', bindATagSmoothScroll)
    }
  }, [])

  // 更新list
  function updateList(data: CommentObject): void {
    const newList = cloneDeep(list)
    newList.unshift(data)
    setList(newList)
    setTotal(total + 1)
  }

  function init(): void {
    setLoading(true)
    setUserLoading(true)
    loadData()
    fetchCurrentUser().finally(() => setUserLoading(false))
  }

  function loadData() {
    return loadList({
      page: syncPage.current,
      deepReply: maxNest <= 0,
      deepReplyCounts: maxNest <= 1
    })
      .then(({ data, total }) => {
        setList(cloneDeep(data))
        const newTotal = countMap.has(uniqStr) ? countMap.get(uniqStr) : total
        setTotal(newTotal)
        setNoMoreData(data.length >= newTotal)
      })
      .finally(() => setLoading(false))
  }

  function reload() {
    if (loading) return
    setPage(1)
    setList([])
    setLoading(true)
    loadData()
  }
  const loadList = useCallback(
    (parameters) => {
      const params = {
        uniqStr: uniqStr,
        pageSize: +pageSize,
        ...parameters
      }
      return fetchComments(params)
    },
    [uniqStr, pageSize]
  )
  const loadMore = useCallback(() => {
    setPage(page + 1)
    return loadData()
  }, [page])

  const updateCommentAsync = useCallback(
    (id, updatedData) => {
      const idx = list.findIndex((obj) => obj.objectId === id)
      const newList = list.slice()
      if (idx !== -1) {
        newList[idx] = {
          ...newList[idx],
          message: updatedData.message,
          updatedAt: updatedData.updatedAt
        }
        setList(newList)
      }
    },
    [list]
  )
  return {
    loading,
    userLoading,
    total,
    list,
    noMoreData,
    loadMore,
    loadList,
    updateCommentAsync,
    updateList
  }
}

export default useListData
