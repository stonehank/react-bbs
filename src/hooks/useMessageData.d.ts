declare function useMessageData({ offset, userInputRef }: {
    offset: any;
    userInputRef: any;
}): {
    at: string;
    rootId: string;
    replyId: string;
    messageEleRef: import("react").MutableRefObject<any>;
    message: string;
    setMessage: import("react").Dispatch<import("react").SetStateAction<string>>;
    startReply: ({ rootId, replyId, replyName }: {
        rootId: any;
        replyId: any;
        replyName: any;
    }) => void;
    cancelReply: () => void;
};
export default useMessageData;
