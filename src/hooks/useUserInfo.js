import {useEffect, useReducer} from 'react'
import {getFromCache, setCache} from "../utils";

export default function useUserInfo(){
    const CACHE_KEY='react-bbs-info'

    let cacheData = getCacheData(CACHE_KEY)
    const userInfoInitial={
        avatar: cacheData.avatar,
        nickname: cacheData.nickname,
        email: cacheData.email,
    }
    const [userInfo,userInfoDispatch] = useReducer(userInfoReducer,userInfoInitial)

    function userInfoReducer(state,action){
        switch(action.type){
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
                    email:action.value
                }
            default:
                return state
        }
    }

    useEffect(()=>{
        setCache(CACHE_KEY, userInfo)
    },[userInfo])

    function setAvatar(avatar){
        return userInfoDispatch({type:'avatar',value:avatar})
    }
    function setEmail(email){
        return userInfoDispatch({type:'email',value:email})
    }
    function setNickname(nickname){
        return userInfoDispatch({type:'nickname',value:nickname})
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

    return {
        ...userInfo,
        setAvatar,
        setEmail,
        setNickname
    }
}
