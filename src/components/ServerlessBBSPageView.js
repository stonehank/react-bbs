import React from 'react';
import useServerLayer from '../hooks/useServerLayer';
import BBSPageViewCore from './core/BBSPageViewCore';
function ServerlessBBSPageView(_a) {
    var _b = _a.uniqStr, uniqStr = _b === void 0 ? window.location.origin + window.location.pathname : _b;
    var _c = useServerLayer(), loading = _c.loading, useConvertLayer = _c.useConvertLayer;
    if (loading)
        return null;
    return (React.createElement(BBSPageViewCore, { uniqStr: uniqStr, useConvertLayer: useConvertLayer }));
}
export default React.memo(ServerlessBBSPageView);
//# sourceMappingURL=ServerlessBBSPageView.js.map