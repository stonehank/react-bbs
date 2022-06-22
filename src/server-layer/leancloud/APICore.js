"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var CustomAV_1 = __importDefault(require("./CustomAV"));
var initAVObject_1 = __importDefault(require("./initAVObject"));
var utils_1 = require("../../utils");
var config_1 = __importDefault(require("../../config"));
var readConfig = config_1["default"].readConfig, readLoggedUser = config_1["default"].readLoggedUser;
function useAPICore() {
    var _a = readConfig(), appId = _a.appId, appKey = _a.appKey, serverURLs = _a.serverURLs, CommentClass = _a.CommentClass, CounterClass = _a.CounterClass, UserClass = _a.UserClass, editMode = _a.editMode, pageviewMap = _a.pageviewMap;
    var ownerCodeKey = 'serverless_react_bbs_ownerCode';
    var oldRandOwnerCode = (0, utils_1.getFromCache)(ownerCodeKey);
    var newRandOwnerCode = oldRandOwnerCode || (0, utils_1.randUniqueString)();
    var defaultUser = {
        id: null,
        attributes: {
            objectId: null,
            sessionToken: null,
            username: null
        }
    };
    var commentsPage = 1;
    var errorCodeMsg = {
        "100": "Initialization failed, Please check your appId and appKey.",
        "401": "Unauthorized operation, Please check your appId and appKey.",
        "403": "Access denied by api domain white list, Please check your security domain."
    };
    var loggedUser = readLoggedUser();
    /**
     * Vue -> $serverLessBBS
     * appId
     * appKey
     * serverURLs
     * CommentClass
     * CounterClass
     * UserClass
     */
    function serverInit() {
        return (0, initAVObject_1["default"])({ appId: appId, appKey: appKey, serverURLs: serverURLs, CommentClass: CommentClass, CounterClass: CounterClass, UserClass: UserClass });
    }
    /**
     * Required
     * 创建页面浏览量
     * 并保存到pageviewMap
     * @param uniqStr
     * @param title
     * @returns {Promise}<Number>
     */
    function __generatePageViews__(uniqStr, title) {
        var Ct = CustomAV_1["default"].Object.extend(CounterClass);
        var newCounter = new Ct();
        var acl = new CustomAV_1["default"].ACL();
        acl.setPublicReadAccess(true);
        acl.setPublicWriteAccess(true);
        newCounter.setACL(acl);
        newCounter.set('uniqStr', uniqStr);
        newCounter.set('title', title);
        newCounter.set('time', 1);
        return newCounter.save().then(function () {
            return 1;
        })["catch"](function (ex) {
            console.error(errorCodeMsg[ex.code], ex);
            return 1;
        });
    }
    /**
     * Required
     * 获取页面的浏览量
     * 并保存到pageviewMap
     * 不存在则先创建
     * @param uniqStr
     * @param title
     * @returns {Promise}<Number>
     */
    function fetchPageViews_server(uniqStr, title) {
        if (pageviewMap.has(uniqStr))
            return pageviewMap.get(uniqStr);
        var query = new CustomAV_1["default"].Query(CounterClass);
        return query.equalTo('uniqStr', uniqStr)
            .find()
            .then(function (items) {
            if (items.length === 0) {
                // 不存在当前页面，创建
                return __generatePageViews__(uniqStr, title);
            }
            else {
                if (items.length > 1) {
                    console.warn("Warning! The uniqStr is not unique! Current uniqStr is: " + uniqStr);
                }
                // 存在页面， 更新
                var item = items[0];
                var updateTime_1 = item.get("time") + 1;
                item.increment("time");
                item.set('title', title);
                return item.save().then(function () {
                    return updateTime_1;
                })["catch"](function () {
                    return updateTime_1 - 1;
                });
            }
        })["catch"](function (ex) {
            console.error(errorCodeMsg[ex.code], ex);
            return __generatePageViews__(uniqStr, title);
        });
    }
    /**
     * Required
     * 获取评论数量
     * @param uniqStr
     * @param includeReply
     * @returns {Promise}<Number>
     */
    function fetchCounts_server(uniqStr, includeReply) {
        if (includeReply === void 0) { includeReply = false; }
        var query = new CustomAV_1["default"].Query(CommentClass);
        var searchPromise;
        if (includeReply) {
            searchPromise = query.equalTo('uniqStr', uniqStr).count();
        }
        else {
            searchPromise = query.equalTo('uniqStr', uniqStr).equalTo('replyId', '').count();
        }
        return searchPromise.then(function (counts) {
            return counts;
        })["catch"](function (ex) {
            if (ex.code === 101) {
                return 0;
            }
            else {
                console.error('Error happen in fetch count', ex);
                return 0;
            }
        });
    }
    /**
     *
     * Required
     * {
     *      id:"6155bb945e0db15b17f31d78"
     *      attributes:{
     *          createdAt: "2021-09-30T13:28:52.022Z"
                        emailVerified: false
                        mobilePhoneVerified: false
                        objectId: "6155bb945e0db15b17f31d78"
                        sessionToken: "t8hllhe8e33yrae0jwlqcu8wa"
                        updatedAt: "2021-09-30T13:28:52.022Z"
                        username: "KsswXQGgsaGBEigmrgyrdhU5F8AAlRzv"
     *      }
     * }
     * @returns {Promise}<UserObject>
     */
    function signIn_server() {
        if (loggedUser)
            return Promise.resolve(loggedUser);
        if (!editMode)
            return Promise.resolve(defaultUser);
        return new Promise(function (res) {
            if (oldRandOwnerCode) {
                return CustomAV_1["default"].User.logIn(oldRandOwnerCode, oldRandOwnerCode)
                    .then(function (user) {
                    console.log('Can login', user);
                    return res(user);
                })["catch"](function (err) {
                    console.log(err);
                    return signUp_server().then(function (user) { return res(user); });
                });
            }
            else {
                return signUp_server().then(function (user) { return res(user); });
            }
        });
    }
    /**
     *
     * Required
     */
    function signUp_server() {
        if (!editMode)
            return Promise.resolve(defaultUser);
        var user = new CustomAV_1["default"].User(UserClass);
        user.setUsername(newRandOwnerCode);
        user.setPassword(newRandOwnerCode);
        console.log('signUp_server', user.id, JSON.stringify(user));
        var acl = new CustomAV_1["default"].ACL();
        acl.setPublicReadAccess(false);
        // acl.setReadAccess(user.id,true);
        // acl.setWriteAccess(user.id,true);
        acl.setPublicWriteAccess(false);
        user.setACL(acl);
        console.log('Can not get, try create new user');
        return user.save().then(function (user) {
            console.log('Create success');
            (0, utils_1.setCache)(ownerCodeKey, newRandOwnerCode);
            oldRandOwnerCode = newRandOwnerCode;
            return user;
        })["catch"](function (err) {
            console.error(err);
            return defaultUser;
        });
    }
    /**
     * Required
     * 更新编辑
     * @param objectId
     * @param message
     * @returns {Promise}<CommentObject>
     */
    function updateComment_server(objectId, message) {
        if (!editMode)
            return Promise.reject(null);
        var Ct = CustomAV_1["default"].Object.extend(CommentClass);
        var comment = new Ct({ objectId: objectId, message: message }, 'PUT');
        comment.set('message', message);
        return comment.save()
            .then(function (data) { return data.attributes; })["catch"](function (err) {
            console.error('update error!', err);
            return null;
        });
    }
    /**
     * Required
     * uploadField
     * {
                  replyId: '',
                  email: '',
                  avatar: '',
                  link: '',
                  message: '',
                  at: '',
                  nickname: '',
                  uniqStr: props.uniqStr,

     * }
     * submit新的评论
     * @param uploadField
     * @returns {Promise}<CommentObject>
     */
    function uploadComment_server(uploadField) {
        var Ct = CustomAV_1["default"].Object.extend(CommentClass);
        var comment = new Ct();
        for (var k in uploadField) {
            if (!uploadField.hasOwnProperty(k))
                continue;
            comment.set(k, uploadField[k]);
        }
        comment.set('url', location.href);
        var acl = new CustomAV_1["default"].ACL();
        acl.setPublicReadAccess(true);
        acl.setPublicWriteAccess(false);
        return signIn_server()
            .then(function (user) {
            // Set user_id
            comment.set('user_id', user.id);
            if (user.id)
                acl.setWriteAccess(user.id, true);
            comment.setACL(acl);
            return comment.save();
        })
            .then(function (response) {
            console.log('upload,success', response);
            var data = response.attributes;
            if (data.error) {
                console.error(data.error);
                return null;
            }
            return data;
        })["catch"](function (ex) {
            console.log('upload,error', ex, ex.code);
            console.error(ex.msg);
            return null;
        });
    }
    /**
     * Required
     * @param uniqStr
     * @returns {Promise}<Array>[]
     */
    function fetchComments_server(uniqStr) {
        var pageSize = 1000;
        return new CustomAV_1["default"].Query(CommentClass)
            .equalTo("uniqStr", uniqStr)
            .select(['nickname', 'rootId', 'message', 'link', 'pid', 'avatar', 'replyId', 'at', 'user_id'])
            .addDescending('createdAt')
            .skip((commentsPage - 1) * pageSize)
            .limit(pageSize)
            .find()
            .then(function (items) {
            commentsPage++;
            return items.map(function (obj) { return obj.attributes; });
        })["catch"](function (ex) {
            if (ex.code === 101) {
                return [];
            }
            else {
                console.error('Error happen in fetch owner task', ex);
            }
        });
    }
    return {
        fetchComments_server: fetchComments_server,
        fetchCounts_server: fetchCounts_server,
        fetchPageViews_server: fetchPageViews_server,
        serverInit: serverInit,
        signIn_server: signIn_server,
        signUp_server: signUp_server,
        updateComment_server: updateComment_server,
        uploadComment_server: uploadComment_server
    };
}
exports["default"] = useAPICore;
