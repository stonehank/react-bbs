import React, { useEffect, useState } from 'react';
import Loading from '../UI/Loading';
function BBSPageViewCore(_a) {
    var uniqStr = _a.uniqStr, useConvertLayer = _a.useConvertLayer;
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(0), count = _c[0], setCount = _c[1];
    var _d = useConvertLayer(), initialLoading = _d.initialLoading, fetchPageViews = _d.fetchPageViews;
    useEffect(function () {
        if (!initialLoading) {
            fetchPageViews(uniqStr)
                .then(function (count) { return setCount(count); })["finally"](function () { return setLoading(false); });
        }
    }, [initialLoading]);
    if (initialLoading)
        return null;
    if (loading)
        return React.createElement(Loading, null);
    return (React.createElement("span", null, count));
}
export default BBSPageViewCore;
//# sourceMappingURL=BBSPageViewCore.js.map