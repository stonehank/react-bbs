import React from 'react'
import messageBodyStyle from '../scss/message-body.module.scss'
import Button from '../../../UI/Button'
import { readConfig } from '../../../../config'

function ReplyActions({ details, edit, isOwnerComment, startReply, saveEdit, showEdit, closeEdit }) {
  const { editMode } = readConfig()
  if (editMode && edit && isOwnerComment) {
    return (
      <div className={messageBodyStyle['bbs-msg-action-edit']}>
        <Button dense text className='mr-4' onClick={closeEdit}>
          Cancel
        </Button>
        <Button dense text color='success' className='mr-4' onClick={saveEdit}>
          Save
        </Button>
      </div>
    )
  }
  return (
    <div className={messageBodyStyle['bbs-msg-action-no-edit']}>
      {editMode && isOwnerComment ? (
        <Button dense text className='mr-4' onClick={showEdit}>
          Edit
        </Button>
      ) : null}
      <Button
        dense
        text
        className='mr-4'
        color='info'
        onClick={() =>
          startReply({
            rootId: details.rootId || details.objectId,
            replyId: details.objectId,
            replyName: details.nickname
          })
        }
      >
        Reply
      </Button>
    </div>
  )
}

export default React.memo(ReplyActions)
