"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var Button_1 = __importDefault(require("../UI/Button"));
function Submit(_a) {
    var submit = _a.submit, submitLoading = _a.submitLoading;
    console.log('render submit');
    return (react_1["default"].createElement("div", { className: "text-right mt-2" },
        react_1["default"].createElement(Button_1["default"], { onClick: submit, loading: submitLoading }, "\u63D0\u4EA4")));
}
exports["default"] = react_1["default"].memo(Submit, function (prev, next) { return prev.submitLoading === next.submitLoading; });
//# sourceMappingURL=Submit.js.map