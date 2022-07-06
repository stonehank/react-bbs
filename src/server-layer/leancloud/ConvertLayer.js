var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useEffect, useState, useRef, useCallback } from 'react';
import { readConfig, setLoggedUser } from '../../config';
import useAPICore from './APICore';
import cloneDeep from 'clone-deep';
/**
 * STEP1: 一次性获取1000个数据
 * STEP2: 转换为嵌套数据, 并且计算回复数
 * STEP3: 根据参数要求提供对应的数据展示
 * 更少的API调用，但是会获取更多的数据
 */
export default function useConvertLayer() {
    var _a = useState(true), initialLoading = _a[0], setInitialLoading = _a[1];
    var noMoreRemoteData = useRef(false);
    var waitNextInserted = useRef([]);
    var checkOnNextInsert = useRef(false);
    var allCommentData = useRef([]);
    var objectIdToData = useRef({});
    var _b = readConfig(), pageviewMap = _b.pageviewMap, countMap = _b.countMap;
    var _c = useAPICore(), serverInit = _c.serverInit, signIn_server = _c.signIn_server, fetchCounts_server = _c.fetchCounts_server, fetchPageViews_server = _c.fetchPageViews_server, updateComment_server = _c.updateComment_server, uploadComment_server = _c.uploadComment_server, fetchComments_server = _c.fetchComments_server;
    useEffect(function () {
        serverInit().then(function () { return setInitialLoading(false); });
    }, []);
    /**
     * Required
     */
    var fetchPageViews = useCallback(function (uniqStr) {
        return fetchPageViews_server(uniqStr).then(function (counts) {
            pageviewMap.set(uniqStr, counts);
            return counts;
        });
    }, []);
    /**
     * Required
     */
    var fetchCounts = useCallback(function (uniqStr) {
        return fetchCounts_server(uniqStr).then(function (counts) {
            countMap.set(uniqStr, counts);
            return counts;
        });
    }, []);
    /**
     * Required
     */
    var updateComment = useCallback(function (id, message) {
        return updateComment_server(id, message).then(function (data) {
            if (!data)
                return null;
            __updateCommentAfterEdit__(id, data);
            return data;
        });
    }, []);
    /**
     * Required
     */
    var uploadComment = useCallback(function (uploadField) {
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
    }, []);
    /**
     * Required
     */
    var fetchCurrentUser = useCallback(function () {
        return signIn_server().then(function (user) {
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
    }, []);
    /**
     * Required
     * @param params
     * @returns {Promise<Object>} {data, total}
     */
    var fetchComments = useCallback(function (params) {
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
        checkOnNextInsert.current = true;
        if (!replyId && !noMoreRemoteData.current) {
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
            filterData = filterData.sort(function (a, b) { return (a.createdAt < b.createdAt ? 1 : -1); });
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
    }, []);
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
            noMoreRemoteData.current = flatList.length < 1000;
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
        if (checkOnNextInsert.current) {
            newFetchList = newFetchList.concat(waitNextInserted.current);
            waitNextInserted.current = [];
            checkOnNextInsert.current = false;
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
        replyCandid.sort(function (a, b) { return (a.createdAt < b.createdAt ? -1 : 1); });
        // DFS遍历arr
        for (var _a = 0, replyCandid_1 = replyCandid; _a < replyCandid_1.length; _a++) {
            var replyItem = replyCandid_1[_a];
            var res = __insertReplyItem__(newAllCommentData, replyItem);
            if (res.inserted) {
                newAllCommentData = res.list;
            }
            else {
                waitNextInserted.current = __spreadArray(__spreadArray([], waitNextInserted.current, true), [replyItem], false);
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
        allList.sort(function (a, b) { return (a.createdAt < b.createdAt ? 1 : -1); });
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
//# sourceMappingURL=ConvertLayer.js.map