"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = require("react");
var index_1 = require("../utils/index");
var constant_1 = require("../constant");
var useDidUpdate_1 = __importDefault(require("./useDidUpdate"));
function useUserCacheData() {
    var cacheData = getCacheData(constant_1.CACHE_KEY);
    var initialUserInfo = {
        avatar: cacheData.avatar,
        nickname: cacheData.nickname,
        email: cacheData.email
    };
    var _a = (0, react_1.useReducer)(userInfoReducer, initialUserInfo), userInfo = _a[0], userInfoDispatch = _a[1];
    (0, useDidUpdate_1["default"])(function () {
        (0, index_1.setCache)(constant_1.CACHE_KEY, userInfo);
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
        var cacheData = (0, index_1.getFromCache)(CACHE_KEY);
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
exports["default"] = useUserCacheData;
//# sourceMappingURL=useUserCacheData.js.map