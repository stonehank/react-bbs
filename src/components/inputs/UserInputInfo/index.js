"use strict";
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
var bbs_panel_core_module_scss_1 = __importDefault(require("../../core/bbs-panel-core.module.scss"));
var Avatar_1 = __importDefault(require("../Avatar"));
var Email_1 = __importDefault(require("../Email"));
var Nickname_1 = __importDefault(require("../Nickname"));
var index_1 = require("../../../utils/index");
var react_fast_compare_1 = __importDefault(require("react-fast-compare"));
var useUserCacheData_1 = __importDefault(require("../../../hooks/useUserCacheData"));
var UserInfo = react_1["default"].forwardRef(function (props, forwardRef) {
    var nicknameRef = (0, react_1.useRef)(null);
    var emailRef = (0, react_1.useRef)(null);
    var bbsInputBoxRef = (0, react_1.useRef)(null);
    var _a = (0, useUserCacheData_1["default"])(), avatar = _a.avatar, email = _a.email, nickname = _a.nickname, setAvatar = _a.setAvatar, setEmail = _a.setEmail, setNickname = _a.setNickname;
    function scrollToMessageInput(offset) {
        return (0, index_1.scrollToEle)(bbsInputBoxRef.current, {
            highlight: false,
            smooth: true,
            offset: offset
        });
    }
    function validate() {
        return nicknameRef.current.validate()
            && emailRef.current.validate();
    }
    (0, react_1.useImperativeHandle)(forwardRef, function () { return ({
        scrollToMessageInput: scrollToMessageInput,
        validate: validate,
        avatar: avatar,
        email: email,
        nickname: nickname
    }); });
    return (react_1["default"].createElement("div", { className: bbs_panel_core_module_scss_1["default"]["bbs-input-box"] },
        react_1["default"].createElement("div", { className: bbs_panel_core_module_scss_1["default"]["bbs-name-avatar"] + ' ' + bbs_panel_core_module_scss_1["default"]["bbs-input"], ref: bbsInputBoxRef },
            react_1["default"].createElement(Avatar_1["default"], { avatar: avatar, setAvatar: setAvatar, email: email, nickname: nickname }),
            react_1["default"].createElement(Nickname_1["default"], { style: { flex: 1 }, ref: nicknameRef, nickname: nickname, setNickname: setNickname })),
        react_1["default"].createElement("div", { className: bbs_panel_core_module_scss_1["default"]["bbs-input"] },
            react_1["default"].createElement(Email_1["default"], { ref: emailRef, email: email, setEmail: setEmail }))));
});
exports["default"] = react_1["default"].memo(UserInfo, react_fast_compare_1["default"]);
//# sourceMappingURL=index.js.map