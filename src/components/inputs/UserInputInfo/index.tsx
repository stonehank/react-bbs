import React, { useImperativeHandle, useRef } from 'react'
import panelStyle from '../../core/bbs-panel-core.module.scss'
import Avatar from '../Avatar'
import Email from '../Email'
import Nickname from '../Nickname'
import { scrollToEle } from '../../../utils/index'
import useUserCacheData from '../../../hooks/useUserCacheData'

const UserInfo = React.forwardRef((_, forwardRef) => {
  const nicknameRef = useRef(null)
  const emailRef = useRef(null)
  const bbsInputBoxRef = useRef(null)
  const { avatar, email, nickname, setAvatar, setEmail, setNickname } = useUserCacheData()

  function scrollToMessageInput(offset) {
    return scrollToEle(bbsInputBoxRef.current, {
      highlight: false,
      smooth: true,
      offset: offset
    })
  }
  function validate() {
    return nicknameRef.current.validate() && emailRef.current.validate()
  }

  useImperativeHandle(forwardRef, () => ({
    scrollToMessageInput,
    validate,
    avatar: avatar,
    email: email,
    nickname: nickname
  }))

  return (
    <div className={panelStyle['bbs-input-box']}>
      <div className={panelStyle['bbs-name-avatar'] + ' ' + panelStyle['bbs-input']} ref={bbsInputBoxRef}>
        <Avatar avatar={avatar} setAvatar={setAvatar} email={email} nickname={nickname} />
        <Nickname style={{ flex: 1 }} ref={nicknameRef} nickname={nickname} setNickname={setNickname} />
      </div>
      <div className={panelStyle['bbs-input']}>
        <Email ref={emailRef} email={email} setEmail={setEmail} />
      </div>
    </div>
  )
})

export default React.memo(UserInfo)
