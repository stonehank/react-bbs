"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = require("react");
var config_1 = __importDefault(require("../../config"));
var APICore_1 = __importDefault(require("./APICore"));
var readConfig = config_1["default"].readConfig, setLoggedUser = config_1["default"].setLoggedUser;
var _a = readConfig(), pageviewMap = _a.pageviewMap, countMap = _a.countMap;
var cloneDeep = require('clone-deep');
/**
 * STEP1: 一次性获取1000个数据
 * STEP2: 转换为嵌套数据, 并且计算回复数
 * STEP3: 根据参数要求提供对应的数据展示
 * 更少的API调用，但是会获取更多的数据
 */
function useConvertLayer() {
    var _a = (0, react_1.useState)(true), initialLoading = _a[0], setInitialLoading = _a[1];
    var _b = (0, react_1.useState)(false), noMoreRemoteData = _b[0], setNoMoreRemoteData = _b[1];
    var _c = (0, react_1.useState)([]), waitNextInserted = _c[0], setWaitNextInserted = _c[1];
    var _d = (0, react_1.useState)(false), checkOnNextInsert = _d[0], setCheckOnNextInsert = _d[1];
    var allCommentData = (0, react_1.useRef)([]);
    var objectIdToData = (0, react_1.useRef)({});
    var _e = (0, APICore_1["default"])(), serverInit = _e.serverInit, signIn_server = _e.signIn_server, fetchCounts_server = _e.fetchCounts_server, fetchPageViews_server = _e.fetchPageViews_server, updateComment_server = _e.updateComment_server, uploadComment_server = _e.uploadComment_server, fetchComments_server = _e.fetchComments_server;
    (0, react_1.useEffect)(function () {
        serverInit().then(function () { return setInitialLoading(false); });
    }, []);
    /**
     * Required
     */
    function fetchPageViews(uniqStr) {
        return fetchPageViews_server(uniqStr)
            .then(function (counts) {
            pageviewMap.set(uniqStr, counts);
            return counts;
        });
    }
    /**
     * Required
     */
    function fetchCounts(uniqStr) {
        return fetchCounts_server(uniqStr)
            .then(function (counts) {
            countMap.set(uniqStr, counts);
            return counts;
        });
    }
    /**
     * Required
     */
    function updateComment(id, message) {
        return updateComment_server(id, message)
            .then(function (data) {
            if (!data)
                return null;
            __updateCommentAfterEdit__(id, data);
            return data;
        });
    }
    /**
     * Required
     */
    function uploadComment(uploadField) {
        return uploadComment_server(uploadField)
            .then(function (data) {
            if (!data)
                return null;
            if (!data.replyId) {
                var count = countMap.get(data.uniqStr);
                countMap.set(data.uniqStr, count + 1);
            }
            __insertInToList__(allCommentData.current, data);
            return data;
        })["catch"](function (err) {
            console.error(err);
            return null;
        });
    }
    /**
     * Required
     */
    function fetchCurrentUser() {
        return signIn_server()
            .then(function (user) {
            var simpleUser = user;
            if (user.attributes) {
                simpleUser = {
                    id: user.id,
                    sessionToken: user.attributes.sessionToken,
                    username: user.attributes.username
                };
            }
            setLoggedUser(simpleUser);
            return simpleUser;
        });
    }
    /**
     * Required
     * @param params
     * @returns {Promise<Object>} {data, total}
     */
    function fetchComments(params) {
        /*
            uniqStr         // 页面唯一值
            rootId          // rootId， 用于插入数据
            replyId         // 存在则搜索对应replyId的数据
            page            // 数据页码
            pageSize        // 数据每页条数
            deepReply       // Boolean, 存在则深度搜索每一个回复（嵌套回复）
            deepReplyCounts // 存在则深度搜索回复数量
         */
        var uniqStr = params.uniqStr, replyId = params.replyId, pageSize = params.pageSize, page = params.page, deepReply = params.deepReply, deepReplyCounts = params.deepReplyCounts;
        var data;
        setCheckOnNextInsert(true);
        if (!replyId && !noMoreRemoteData) {
            data = __getMoreData__(uniqStr);
        }
        else {
            data = Promise.resolve(allCommentData.current);
        }
        return data.then(function (nestedData) {
            var filterData = nestedData;
            if (replyId) {
                filterData = objectIdToData.current[replyId].replys;
                if (deepReply) {
                    filterData = __deepSearchReply__(filterData);
                }
            }
            else {
                if (deepReply) {
                    filterData = Object.values(objectIdToData.current);
                }
            }
            filterData = filterData.sort(function (a, b) { return a.createdAt < b.createdAt ? 1 : -1; });
            // 这里获取从0到当前page的所有评论
            var result = cloneDeep(filterData.slice(0, pageSize * page));
            if (deepReplyCounts) {
                __deepSearchReplyCount__(result);
            }
            result = result.map(function (obj) {
                obj.replys = null;
                return obj;
            });
            return new Promise(function (res) {
                setTimeout(function () {
                    res({
                        data: result,
                        total: Math.max(allCommentData.current.length, result.length, filterData.length)
                    });
                }, 200);
            });
        });
    }
    function __updateCommentAfterEdit__(objectId, editData) {
        // let comment=objectIdToData.current[objectId]
        objectIdToData.current[objectId].message = editData.message;
        objectIdToData.current[objectId].updatedAt = editData.updatedAt;
    }
    function __insertInToList__(list, data) {
        // 插入到对应的嵌套层，同时也要更新replyCounts数字
        if (data.replyId) {
            var replyData = objectIdToData.current[data.replyId];
            if (replyData.replys == null) {
                replyData.replys = [];
                replyData.replyCounts = 0;
            }
            replyData.replys.unshift(data);
            replyData.replyCounts++;
        }
        else {
            list.unshift(data);
        }
        objectIdToData.current[data.objectId] = data;
    }
    function __getMoreData__(uniqStr) {
        console.log('mock network');
        return fetchComments_server(uniqStr)
            .then(function (flatList) {
            setNoMoreRemoteData(flatList.length < 1000);
            return flatList;
        })
            .then(__generateIndexSearch__)
            .then(__mergeToNest__)
            .then(__generateReplyCounts__);
    }
    function __deepSearchReply__(allReplyList) {
        var res = [];
        for (var i = 0; i < allReplyList.length; i++) {
            res.push(allReplyList[i]);
            if (allReplyList[i].replys) {
                res = res.concat(__deepSearchReply__(allReplyList[i].replys));
            }
        }
        return res;
    }
    function __deepSearchReplyCount__(allReplyList) {
        var allCounts = 0;
        for (var i = 0; i < allReplyList.length; i++) {
            if (allReplyList[i].replys && allReplyList[i].replys.length > 0) {
                allReplyList[i].replyCounts = __deepSearchReplyCount__(allReplyList[i].replys);
                allCounts += allReplyList[i].replyCounts + 1;
            }
            else {
                allCounts += 1;
            }
        }
        return allCounts;
    }
    function __mergeToNest__(newFetchList) {
        if (checkOnNextInsert) {
            newFetchList = newFetchList.concat(waitNextInserted);
            setWaitNextInserted([]);
            setCheckOnNextInsert(false);
        }
        var replyCandid = [];
        var newAllCommentData = allCommentData.current.slice();
        for (var _i = 0, newFetchList_1 = newFetchList; _i < newFetchList_1.length; _i++) {
            var item = newFetchList_1[_i];
            if (item.replyId) {
                replyCandid.push(item);
                continue;
            }
            newAllCommentData.push(item);
        }
        replyCandid.sort(function (a, b) { return a.createdAt < b.createdAt ? -1 : 1; });
        // DFS遍历arr
        for (var _a = 0, replyCandid_1 = replyCandid; _a < replyCandid_1.length; _a++) {
            var replyItem = replyCandid_1[_a];
            var res = __insertReplyItem__(newAllCommentData, replyItem);
            if (res.inserted) {
                newAllCommentData = res.list;
            }
            else {
                setWaitNextInserted(__spreadArray(__spreadArray([], waitNextInserted, true), [replyItem], false));
            }
        }
        allCommentData.current = newAllCommentData;
        return newAllCommentData;
    }
    function __generateReplyCounts__(list) {
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            if (item.replys && item.replys.length > 0) {
                item.replyCounts = item.replys.length;
                __generateReplyCounts__(item.replys);
            }
            else {
                item.replyCounts = 0;
            }
        }
        return list;
    }
    function __generateIndexSearch__(list) {
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var item = list_2[_i];
            objectIdToData.current[item.objectId] = item;
        }
        return list;
    }
    function __insertReplyItem__(allList, item) {
        if (!allList || allList.length === 0)
            return { list: allList, inserted: false };
        allList.sort(function (a, b) { return a.createdAt < b.createdAt ? 1 : -1; });
        var replyId = item.replyId, rootId = item.rootId;
        for (var i = 0; i < allList.length; i++) {
            var curDetectObj = allList[i];
            var detectObjRootId = curDetectObj.rootId || curDetectObj.objectId;
            if (detectObjRootId !== rootId)
                continue;
            if (curDetectObj.objectId === replyId) {
                if (curDetectObj.replys == null)
                    curDetectObj.replys = [];
                curDetectObj.replys.push(item);
                return { list: allList, inserted: true };
            }
            else {
                var res = __insertReplyItem__(curDetectObj.replys, item);
                if (res.inserted) {
                    curDetectObj.replys = res.list;
                    return { list: allList, inserted: true };
                }
            }
        }
        return { list: allList, inserted: false };
    }
    return {
        initialLoading: initialLoading,
        fetchPageViews: fetchPageViews,
        fetchComments: fetchComments,
        fetchCounts: fetchCounts,
        fetchCurrentUser: fetchCurrentUser,
        updateComment: updateComment,
        uploadComment: uploadComment
    };
}
exports["default"] = useConvertLayer;
//# sourceMappingURL=ConvertLayer.js.map