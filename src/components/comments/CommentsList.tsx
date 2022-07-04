import React from 'react'
import ListRender from './ListRender'
import MoreButton from './MoreButton'
import Loading from '../UI/Loading'

type Params = {
  maxNest;
  loading;
  userLoading;
  list;
  total;
  noMoreData;
  loadMore;
  loadList;
  updateCommentAsync;
}
function CommentsList(props: Params) {
  const { maxNest, loading, userLoading, list, total, noMoreData, loadMore, loadList, updateCommentAsync } = props

  if (loading || userLoading) {
    return (
      <div className='text-center'>
        <Loading size={48} />
      </div>
    )
  }
  return (
    <section>
      <p className='text-md'>
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
      {noMoreData && list.length === 0 ? (
        <p className='text-center text-secondary'>还没有任何评论~</p>
      ) : (
        <MoreButton noMoreData={noMoreData} loadMore={loadMore} />
      )}
    </section>
  )
}

export default React.memo(CommentsList)
