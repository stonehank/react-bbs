import { useReducer } from 'react'
import { getFromCache, setCache } from '../utils/index'
import { CACHE_KEY } from '../constant'
import useDidUpdate from './useDidUpdate'
import { UserInfo } from '../types'

type UserCacheDataResult = UserInfo & {
  setAvatar: (avatar: string) => void;
  setEmail: (email: string) => void;
  setNickname: (nickname: string) => void;
}
function userInfoReducer(state: UserInfo, action: { type: string; value: string }): UserInfo {
  switch (action.type) {
    case 'nickname':
      return {
        ...state,
        nickname: action.value
      }
    case 'avatar':
      return {
        ...state,
        avatar: action.value
      }
    case 'email':
      return {
        ...state,
        email: action.value
      }
    default:
      return state
  }
}
function getCacheData(CACHE_KEY) {
  let cacheData = getFromCache(CACHE_KEY)
  if (cacheData == null) {
    cacheData = {
      nickname: '',
      email: '',
      avatar: ''
    }
  }
  return cacheData
}
function useUserCacheData(): UserCacheDataResult {
  const cacheData = getCacheData(CACHE_KEY)
  const initialUserInfo: UserInfo = {
    avatar: cacheData.avatar,
    nickname: cacheData.nickname,
    email: cacheData.email
  }
  const [userInfo, userInfoDispatch] = useReducer(userInfoReducer, initialUserInfo)

  useDidUpdate(() => {
    setCache(CACHE_KEY, userInfo)
  }, [userInfo])

  function setAvatar(avatar) {
    return userInfoDispatch({ type: 'avatar', value: avatar })
  }
  function setEmail(email) {
    return userInfoDispatch({ type: 'email', value: email })
  }
  function setNickname(nickname) {
    return userInfoDispatch({ type: 'nickname', value: nickname })
  }

  return {
    ...userInfo,
    setAvatar,
    setEmail,
    setNickname
  }
}

export default useUserCacheData
