/// <reference types="react" />
declare function useReplyEdit(props: any): {
    edit: boolean;
    editMessage: string;
    setEditMessage: import("react").Dispatch<import("react").SetStateAction<string>>;
    saveEdit: () => void;
    showEdit: () => void;
    closeEdit: () => void;
};
export default useReplyEdit;
