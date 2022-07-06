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
import React from 'react';
import BBSPanelCore from './core/BBSPanelCore';
import '../assets/css/common.scss';
import '../assets/css/highlight.scss';
import '../assets/css/github-markdown.scss';
import useServerLayer from '../hooks/useServerLayer';
function ServerlessBBSPanel(props) {
    var _a = useServerLayer(), loading = _a.loading, useConvertLayer = _a.useConvertLayer;
    if (loading)
        return null;
    return (React.createElement("section", { className: 'serverless-bbs' },
        React.createElement(BBSPanelCore, __assign({}, props, { useConvertLayer: useConvertLayer }))));
}
ServerlessBBSPanel.defaultProps = {
    editable: true,
    pageSize: 5,
    nest: 1,
    offset: 0,
    uniqStr: window.location.origin + window.location.pathname
};
export default React.memo(ServerlessBBSPanel);
//# sourceMappingURL=ServerlessBBSPanel.js.map