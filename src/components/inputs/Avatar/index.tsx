import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import PopupButton from '../../UI/PopupButton'
import avatarStyle from './avatar.module.scss'
import crypto from 'blueimp-md5'
import useDidUpdate from '../../../hooks/useDidUpdate'

const StyledPopupButton = styled(PopupButton)`
  margin: 0 0 16px 0;
  opacity: 1;
`

type AvatarProps = {
  avatar: string
  email: string
  nickname: string
  size: number
  setAvatar: any
}

function Avatar(props: AvatarProps) {
  const { avatar, setAvatar, email, nickname, size } = props
  const [popupShow, setPopupShow] = useState(false)
  const [avatarsList, setAvatarsList] = useState([])
  // todo constant
  const GRAVATAR_URL = 'https://gravatar.loli.net/avatar'

  useEffect(() => {
    const emailSrc = createEmailSrc()
    const nameSrc = createNameSrc()
    const others = ['mp', 'identicon', 'monsterid', 'retro', 'robohash', 'wavatar'].map(
      (str) => `${GRAVATAR_URL}/?d=${str}&size=${size}`
    )
    const newAvatarList = [emailSrc, nameSrc, ...others]
    setAvatarsList(newAvatarList)
    if (avatar) return
    const rdAvatar = newAvatarList[Math.floor(Math.random() * newAvatarList.length)]
    setAvatar(rdAvatar)
  }, [])

  useDidUpdate(() => {
    updateAvatarList()
  }, [email, nickname, size])

  function createEmailSrc() {
    return email
      ? `https://www.gravatar.com/avatar/${crypto(email.toLowerCase().trim())}?s=${size}`
      : `https://www.gravatar.com/avatar?s=${size}`
  }

  function createNameSrc() {
    return nickname
      ? `https://ui-avatars.com/api/?background=199ed9&color=fff&name=${nickname}&size=${size}`
      : `https://ui-avatars.com/api/?background=199ed9&color=fff&name=&size=${size}`
  }

  const updateAvatarList = useCallback(
    function() {
      const emailSrc = createEmailSrc()
      const nameSrc = createNameSrc()
      if (email && nickname) {
        setAvatarsList([emailSrc, nameSrc, ...avatarsList.slice(2)])
      } else if (email) {
        setAvatarsList([emailSrc, ...avatarsList.slice(1)])
      } else if (nickname) {
        setAvatarsList([avatarsList[0], nameSrc, ...avatarsList.slice(2)])
      }
    },
    [email, nickname]
  )

  const chooseAvatar = useCallback(function(src) {
    return () => {
      setAvatar(src)
      setPopupShow(false)
    }
  }, [])

  const generatePopupContent = useCallback(
    function() {
      return (
        <div className={avatarStyle['avatar-panel-box']}>
          {avatarsList.map((src, index) => (
            <div
              className={avatarStyle['avatar-panel-item']}
              key={index}
              onClick={chooseAvatar(src)}
              style={{
                backgroundImage: 'url(' + src + ')'
              }}
            />
          ))}
        </div>
      )
    },
    [avatarsList]
  )

  return (
    <StyledPopupButton
      color='error'
      dense
      text
      show={popupShow}
      setShow={setPopupShow}
      beforeOpen={updateAvatarList}
      popupContent={generatePopupContent}
    >
      <img className={avatarStyle['bbs-avatar']} src={avatar} alt='' />
    </StyledPopupButton>
  )
}

Avatar.defaultProps = {
  size: 48,
  email: '',
  nickname: '',
  avatar: null
}

export default React.memo(Avatar)
