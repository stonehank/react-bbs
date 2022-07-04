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
import React, { useEffect, useRef, useState } from 'react';
import BBSPanelCore from './core/BBSPanelCore';
import PropTypes from 'prop-types';
import '../assets/css/common.scss';
import '../assets/css/highlight.scss';
import '../assets/css/github-markdown.scss';
import { readConfig } from '../config';
function ServerlessBBSPanel(props) {
    var _a = useState(true), layerLoading = _a[0], setLayerLoading = _a[1];
    var useConvertLayer = useRef(null);
    function getServerLayer(server) {
        return server === 'leancloud'
            ? import('../server-layer/leancloud/ConvertLayer')
            : import('../server-layer/firebase/ConvertLayer');
    }
    useEffect(function () {
        var server = readConfig().server;
        getServerLayer(server).then(function (module) {
            useConvertLayer.current = module["default"];
            setLayerLoading(false);
        });
    }, []);
    if (layerLoading)
        return null;
    return (React.createElement("section", { className: 'serverless-bbs' },
        React.createElement(BBSPanelCore, __assign({}, props, { useConvertLayer: useConvertLayer.current }))));
}
ServerlessBBSPanel.propTypes = {
    pageSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nest: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    uniqStr: PropTypes.string,
    editable: PropTypes.bool
};
ServerlessBBSPanel.defaultProps = {
    editable: true,
    pageSize: 5,
    nest: 1,
    offset: 0,
    uniqStr: window.location.origin + window.location.pathname
};
export default React.memo(ServerlessBBSPanel);
//# sourceMappingURL=ServerlessBBSPanel.js.map