import {useCallback, useState} from 'react';


function useReplyEdit(props) {
    const {details, editMessageRef, updateComment, updateCommentAsync}=props
    const [edit, setEdit]=useState<boolean>(false)
    const [editMessage, setEditMessage]=useState<string>(details.message)

    function showEdit():void{
        setEdit(true)
        setEditMessage(details.message)
    }

    function closeEdit():void{
        setEdit(false)
        setEditMessage(details.message)
    }

    const saveEdit=useCallback(function():void{
        if(!validate())return
        let id=details.objectId
        updateComment(id,editMessage)
            .then(data=>{
                if(!data)return
                closeEdit()
                updateCommentAsync(id,data)
            })
    },[editMessage,details.id])


    function validate():boolean {
        return editMessageRef.current.validate()
    }

    return {
        edit,
        editMessage,
        setEditMessage,
        saveEdit,
        showEdit,
        closeEdit,
    }
}

export default useReplyEdit;
