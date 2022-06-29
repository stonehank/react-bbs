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
import { useCallback, useEffect, useState } from 'react';
import useSyncState from './useSyncState';
import useDidUpdate from './useDidUpdate';
import cloneDeep from 'clone-deep';
import bindATagSmoothScroll from '../utils/DOM/bindATagSmoothScroll';
import { readConfig } from '../config';
var countMap = readConfig().countMap;
function useListData(_a) {
    var maxNest = _a.maxNest, uniqStr = _a.uniqStr, pageSize = _a.pageSize, fetchComments = _a.fetchComments, fetchCurrentUser = _a.fetchCurrentUser;
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(true), userLoading = _c[0], setUserLoading = _c[1];
    var _d = useSyncState(1), page = _d[0], syncPage = _d[1], setPage = _d[2];
    var _e = useState([]), list = _e[0], setList = _e[1];
    var _f = useState(null), total = _f[0], setTotal = _f[1];
    var _g = useState(true), noMoreData = _g[0], setNoMoreData = _g[1];
    useDidUpdate(function () {
        reload();
    }, [maxNest, pageSize]);
    useEffect(function () {
        /** 流程
         * 获取数据-> 回复
         * 获取数据-> count
         * 根据maxNest，editable, pageSize，分页方式进行渲染
         * */
        init();
        document.addEventListener('click', bindATagSmoothScroll);
        return function () {
            document.removeEventListener('click', bindATagSmoothScroll);
        };
    }, []);
    // 更新list
    function updateList(data) {
        var newList = cloneDeep(list);
        newList.unshift(data);
        setList(newList);
        setTotal(total + 1);
    }
    function init() {
        setLoading(true);
        setUserLoading(true);
        loadData();
        fetchCurrentUser()["finally"](function () { return setUserLoading(false); });
    }
    function loadData() {
        return loadList({
            page: syncPage.current,
            deepReply: maxNest <= 0,
            deepReplyCounts: maxNest <= 1
        })
            .then(function (_a) {
            var data = _a.data, total = _a.total;
            setList(cloneDeep(data));
            var newTotal = countMap.has(uniqStr) ? countMap.get(uniqStr) : total;
            setTotal(newTotal);
            setNoMoreData(data.length >= newTotal);
        })["finally"](function () { return setLoading(false); });
    }
    function reload() {
        if (loading)
            return;
        setPage(1);
        setList([]);
        setLoading(true);
        loadData();
    }
    var loadList = useCallback(function (parameters) {
        var params = __assign({ uniqStr: uniqStr, pageSize: +pageSize }, parameters);
        return fetchComments(params);
    }, [uniqStr, pageSize]);
    var loadMore = useCallback(function () {
        setPage(page + 1);
        return loadData();
    }, [page]);
    var updateCommentAsync = useCallback(function (id, updatedData) {
        var idx = list.findIndex(function (obj) { return obj.objectId === id; });
        var newList = list.slice();
        if (idx !== -1) {
            newList[idx] = __assign(__assign({}, newList[idx]), { message: updatedData.message, updatedAt: updatedData.updatedAt });
            setList(newList);
        }
    }, [list]);
    return {
        loading: loading,
        userLoading: userLoading,
        total: total,
        list: list,
        noMoreData: noMoreData,
        loadMore: loadMore,
        loadList: loadList,
        updateCommentAsync: updateCommentAsync,
        updateList: updateList
    };
}
export default useListData;
//# sourceMappingURL=useListData.js.map