import React from 'react';
import useServerLayer from '../hooks/useServerLayer';
import BBSCounterCore from './core/BBSCounterCore';
function ServerlessBBSCounter(_a) {
    var uniqStr = _a.uniqStr;
    var _b = useServerLayer(), loading = _b.loading, useConvertLayer = _b.useConvertLayer;
    if (loading)
        return null;
    return (React.createElement(BBSCounterCore, { uniqStr: uniqStr, useConvertLayer: useConvertLayer }));
}
ServerlessBBSCounter.defaultProps = {
    uniqStr: window.location.origin + window.location.pathname
};
export default React.memo(ServerlessBBSCounter);
//# sourceMappingURL=ServerlessBBSCounter.js.map