"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var BBSPanelCore_1 = __importDefault(require("./core/BBSPanelCore"));
var prop_types_1 = __importDefault(require("prop-types"));
require("../assets/css/common.scss");
require("../assets/css/highlight.scss");
require("../assets/css/github-markdown.scss");
// import useConvertLayer from "../server-layer/firebase/ConvertLayer";
var config_1 = require("../config");
function ServerlessBBSPanel(props) {
    var _a = (0, react_1.useState)(true), layerLoading = _a[0], setLayerLoading = _a[1];
    var useConvertLayer = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var server = (0, config_1.readConfig)().server;
        getServerLayer(server)
            .then(function (module) {
            useConvertLayer.current = module["default"];
            setLayerLoading(false);
        });
    }, []);
    function getServerLayer(server) {
        return server === 'leancloud'
            ? Promise.resolve().then(function () { return __importStar(require('../server-layer/leancloud/ConvertLayer')); }) : Promise.resolve().then(function () { return __importStar(require('../server-layer/firebase/ConvertLayer')); });
    }
    if (layerLoading)
        return null;
    return (react_1["default"].createElement("section", { className: "serverless-bbs" },
        react_1["default"].createElement(BBSPanelCore_1["default"], __assign({}, props, { useConvertLayer: useConvertLayer.current }))));
}
ServerlessBBSPanel.propTypes = {
    pageSize: prop_types_1["default"].oneOfType([
        prop_types_1["default"].string,
        prop_types_1["default"].number,
    ]),
    nest: prop_types_1["default"].oneOfType([
        prop_types_1["default"].string,
        prop_types_1["default"].number,
    ]),
    offset: prop_types_1["default"].oneOfType([
        prop_types_1["default"].string,
        prop_types_1["default"].number,
    ]),
    uniqStr: prop_types_1["default"].string,
    editable: prop_types_1["default"].bool
};
ServerlessBBSPanel.defaultProps = {
    editable: true,
    pageSize: 5,
    nest: 1,
    offset: 0,
    uniqStr: window.location.origin + window.location.pathname
};
function propsAreEqual(prevProps, nextProps) {
    // uniqStr,nest,pageSize,offset,editable
    return prevProps.nest === nextProps.nest
        && prevProps.uniqStr === nextProps.uniqStr
        && prevProps.pageSize === nextProps.pageSize
        && prevProps.editable === nextProps.editable
        && prevProps.offset === nextProps.offset;
}
var MemoizedServerlessBBSPanel = react_1["default"].memo(ServerlessBBSPanel, propsAreEqual);
exports["default"] = MemoizedServerlessBBSPanel;
//# sourceMappingURL=ServerlessBBSPanel.js.map