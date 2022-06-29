import React from 'react'
import messageBodyStyle from '../scss/message-body.module.scss'
import Button from '../../../UI/Button'

function ReplyActions({ details, edit, isOwnerComment, startReply, saveEdit, showEdit, closeEdit }) {
  if (edit && isOwnerComment) {
    return (
      <div className={messageBodyStyle['bbs-msg-action-edit']}>
        <Button dense text className='mr-4' onClick={closeEdit}>
          取消
        </Button>
        <Button dense text color='success' className='mr-4' onClick={saveEdit}>
          保存
        </Button>
      </div>
    )
  }
  return (
    <div className={messageBodyStyle['bbs-msg-action-no-edit']}>
      {isOwnerComment ? (
        <Button dense text className='mr-4' onClick={showEdit}>
          编辑
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
        回复
      </Button>
    </div>
  )
}

export default React.memo(ReplyActions)
