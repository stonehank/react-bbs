"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var bbs_panel_core_module_scss_1 = __importDefault(require("../../core/bbs-panel-core.module.scss"));
var Avatar_1 = __importDefault(require("../Avatar"));
var Email_1 = __importDefault(require("../Email"));
var Nickname_1 = __importDefault(require("../Nickname"));
function UserInfo(props) {
    var bbsInputBoxRef = props.bbsInputBoxRef, nicknameRef = props.nicknameRef, emailRef = props.emailRef, avatar = props.avatar, nickname = props.nickname, email = props.email, setAvatar = props.setAvatar, setNickname = props.setNickname, setEmail = props.setEmail;
    return (react_1["default"].createElement("div", { className: bbs_panel_core_module_scss_1["default"]["bbs-input-box"] },
        react_1["default"].createElement("div", { className: bbs_panel_core_module_scss_1["default"]["bbs-name-avatar"] + ' ' + bbs_panel_core_module_scss_1["default"]["bbs-input"], ref: bbsInputBoxRef },
            react_1["default"].createElement(Avatar_1["default"], { avatar: avatar, setAvatar: setAvatar, email: email, nickname: nickname }),
            react_1["default"].createElement(Nickname_1["default"], { style: { flex: 1 }, ref: nicknameRef, nickname: nickname, setNickname: setNickname })),
        react_1["default"].createElement("div", { className: bbs_panel_core_module_scss_1["default"]["bbs-input"] },
            react_1["default"].createElement(Email_1["default"], { ref: emailRef, email: email, setEmail: setEmail }))));
}
exports["default"] = react_1["default"].memo(UserInfo);
//# sourceMappingURL=index.js.map