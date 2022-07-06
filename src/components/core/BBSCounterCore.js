import React, { useEffect, useState } from 'react';
import Loading from '../UI/Loading';
import { readConfig } from '../../config';
var loopTimer = null;
function BBSCounterCore(_a) {
    var uniqStr = _a.uniqStr, useConvertLayer = _a.useConvertLayer;
    var countMap = readConfig().countMap;
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(0), count = _c[0], setCount = _c[1];
    var _d = useConvertLayer(), initialLoading = _d.initialLoading, fetchCounts = _d.fetchCounts;
    useEffect(function () {
        if (!initialLoading) {
            fetchCounts(uniqStr)
                .then(function (count) { return setCount(count); })["finally"](function () { return setLoading(false); });
        }
        loopTimer = setInterval(function () {
            setCount(countMap.get(uniqStr));
        }, 1000);
        return function () {
            clearInterval(loopTimer);
        };
    }, [initialLoading]);
    if (initialLoading)
        return null;
    if (loading)
        return React.createElement(Loading, null);
    return (React.createElement("span", null, count));
}
export default BBSCounterCore;
//# sourceMappingURL=BBSCounterCore.js.map