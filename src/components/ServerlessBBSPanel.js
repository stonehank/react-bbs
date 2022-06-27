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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var BBSPanelCore_1 = __importDefault(require("./core/BBSPanelCore"));
var prop_types_1 = __importDefault(require("prop-types"));
require("../assets/css/common.scss");
require("../assets/css/highlight.scss");
require("../assets/css/github-markdown.scss");
var ConvertLayer_1 = __importDefault(require("../server-layer/leancloud/ConvertLayer"));
function ServerlessBBSPanel(props) {
    return (react_1["default"].createElement("section", { className: "serverless-bbs" },
        react_1["default"].createElement(BBSPanelCore_1["default"], __assign({}, props, { useConvertLayer: ConvertLayer_1["default"] }))));
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