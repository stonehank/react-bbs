declare type ListDataProps = {
    maxNest: number;
    uniqStr: string;
    pageSize: number;
    fetchComments: (params: FetchCommentParams) => Promise<FetchCommentResult>;
    fetchCurrentUser: () => Promise<SingUserInfo>;
};
interface ListDataOutput {
    loading: boolean;
    userLoading: boolean;
    total: number;
    list: CommentObject[];
    noMoreData: boolean;
    loadMore: () => void;
    loadList: (parameters: any) => Promise<{
        data: CommentObject[];
        total: number;
    }>;
    updateCommentAsync: (id: string, updatedData: CommentObject) => void;
    updateList: (data: CommentObject) => void;
}
declare function useListData({ maxNest, uniqStr, pageSize, fetchComments, fetchCurrentUser }: ListDataProps): ListDataOutput;
export default useListData;
