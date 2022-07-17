import React, {  useContext } from 'react';
import CommentsList from './CommentsList';
import ReplyUpdateContext from '../../context/replys/ReplyUpdateContext';
import useListData, { ListDataOutput } from '../../hooks/useListData';
import { FetchCommentParams, FetchCommentResult, SignUserInfo } from '../../types';
import { UpdateReply } from '../../context/replys/ReplyUpdateProvider';

interface Props {
  uniqStr: string;
  maxNest: number;
  editable: boolean;
  pageSize: number;
  fetchComments: (params: FetchCommentParams) => Promise<FetchCommentResult>;
  fetchCurrentUser: () => Promise<SignUserInfo>;
}

interface Handler {
  updateList: ListDataOutput['updateList'],
  updateReply: UpdateReply
}

const Comments: React.ForwardRefRenderFunction<Handler, Props> =
  (
    { uniqStr, maxNest, pageSize, fetchComments, fetchCurrentUser },
    commentsRef) => {
    const {
      loading,
      userLoading,
      list,
      total,
      noMoreData,
      loadMore,
      loadList,
      updateCommentAsync,
      updateList
    } = useListData({
      uniqStr,
      maxNest,
      pageSize,
      fetchComments,
      fetchCurrentUser
    });

    const { updateReply }: { updateReply: UpdateReply } = useContext(ReplyUpdateContext);

    React.useImperativeHandle(commentsRef, () => ({
      updateList,
      updateReply
    }));
    return (
      <CommentsList
        maxNest={maxNest}
        loading={loading}
        userLoading={userLoading}
        list={list}
        total={total}
        noMoreData={noMoreData}
        loadMore={loadMore}
        loadList={loadList}
        updateCommentAsync={updateCommentAsync}
      />
    );
  };


export default React.forwardRef(Comments);
