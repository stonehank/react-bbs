import {useState} from 'react';

function useReplyEdit(props) {
    const {details, editMessageRef, updateComment, updateCommentAsync}=props
    const [edit, setEdit]=useState(false)
    const [editMessage, setEditMessage]=useState(details.message)

    function showEdit(){
        setEdit(true)
        setEditMessage(details.message)
    }

    function closeEdit(){
        setEdit(false)
        setEditMessage(details.message)
    }

    function saveEdit(){
        if(!validate())return
        let id=details.objectId
        updateComment(id,editMessage)
            .then(data=>{
                if(!data)return
                closeEdit()
                updateCommentAsync(id,data)
            })
    }

    function validate() {
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
