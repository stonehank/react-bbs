declare function useReplyListData({ details, curNest, maxNest, loadList, updateReplyDetails, updateCommentAsync }: {
    details: any;
    curNest: any;
    maxNest: any;
    loadList: any;
    updateReplyDetails: any;
    updateCommentAsync: any;
}): {
    replyList: CommentObject[];
    nodata: boolean;
    replyCounts: number;
    replyLoading: boolean;
    showReply: boolean;
    toggleReplyList: () => Promise<void>;
    fetchMore: () => void;
    updateCommentInReplyAsync: (id: string, data: {
        message: string;
        updatedAt: string;
    }) => void;
};
export default useReplyListData;
