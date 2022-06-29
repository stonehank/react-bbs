var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useReducer } from 'react';
import { getFromCache, setCache } from '../utils/index';
import { CACHE_KEY } from '../constant';
import useDidUpdate from './useDidUpdate';
function useUserCacheData() {
    var cacheData = getCacheData(CACHE_KEY);
    var initialUserInfo = {
        avatar: cacheData.avatar,
        nickname: cacheData.nickname,
        email: cacheData.email
    };
    var _a = useReducer(userInfoReducer, initialUserInfo), userInfo = _a[0], userInfoDispatch = _a[1];
    useDidUpdate(function () {
        setCache(CACHE_KEY, userInfo);
    }, [userInfo]);
    function userInfoReducer(state, action) {
        switch (action.type) {
            case 'nickname':
                return __assign(__assign({}, state), { nickname: action.value });
            case 'avatar':
                return __assign(__assign({}, state), { avatar: action.value });
            case 'email':
                return __assign(__assign({}, state), { email: action.value });
            default:
                return state;
        }
    }
    function getCacheData(CACHE_KEY) {
        var cacheData = getFromCache(CACHE_KEY);
        if (cacheData == null) {
            cacheData = {
                nickname: '',
                email: '',
                avatar: ''
            };
        }
        return cacheData;
    }
    function setAvatar(avatar) {
        return userInfoDispatch({ type: 'avatar', value: avatar });
    }
    function setEmail(email) {
        return userInfoDispatch({ type: 'email', value: email });
    }
    function setNickname(nickname) {
        return userInfoDispatch({ type: 'nickname', value: nickname });
    }
    return __assign(__assign({}, userInfo), { setAvatar: setAvatar, setEmail: setEmail, setNickname: setNickname });
}
export default useUserCacheData;
//# sourceMappingURL=useUserCacheData.js.map