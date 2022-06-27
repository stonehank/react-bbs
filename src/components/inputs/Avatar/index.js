"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var PopupButton_1 = __importDefault(require("../../UI/PopupButton"));
var avatar_module_scss_1 = __importDefault(require("./avatar.module.scss"));
var blueimp_md5_1 = __importDefault(require("blueimp-md5"));
var useDidUpdate_1 = __importDefault(require("../../../hooks/useDidUpdate"));
var StyledPopupButton = (0, styled_components_1["default"])(PopupButton_1["default"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    margin:0 0 16px 0;\n    opacity:1;\n"], ["\n    margin:0 0 16px 0;\n    opacity:1;\n"])));
function Avatar(props) {
    var avatar = props.avatar, setAvatar = props.setAvatar, email = props.email, nickname = props.nickname, size = props.size;
    var _a = (0, react_1.useState)(false), popupShow = _a[0], setPopupShow = _a[1];
    var _b = (0, react_1.useState)([]), avatarsList = _b[0], setAvatarsList = _b[1];
    // todo constant
    var GRAVATAR_URL = 'https://gravatar.loli.net/avatar';
    (0, react_1.useEffect)(function () {
        var emailSrc = createEmailSrc();
        var nameSrc = createNameSrc();
        var others = ["mp", "identicon", "monsterid", "retro", "robohash", "wavatar"].map(function (str) { return "".concat(GRAVATAR_URL, "/?d=").concat(str, "&size=").concat(size); });
        var newAvatarList = __spreadArray([emailSrc, nameSrc], others, true);
        setAvatarsList(newAvatarList);
        if (avatar)
            return;
        var rdAvatar = newAvatarList[Math.floor(Math.random() * newAvatarList.length)];
        setAvatar(rdAvatar);
    }, []);
    (0, useDidUpdate_1["default"])(function () {
        console.log('update');
        updateAvatarList();
    }, [email, nickname, size]);
    function createEmailSrc() {
        return email
            ? "https://www.gravatar.com/avatar/".concat((0, blueimp_md5_1["default"])(email.toLowerCase().trim()), "?s=").concat(size)
            : "https://www.gravatar.com/avatar?s=".concat(size);
    }
    function createNameSrc() {
        return nickname
            ? "https://ui-avatars.com/api/?background=199ed9&color=fff&name=".concat(nickname, "&size=").concat(size)
            : "https://ui-avatars.com/api/?background=199ed9&color=fff&name=&size=".concat(size);
    }
    function updateAvatarList() {
        var emailSrc = createEmailSrc();
        var nameSrc = createNameSrc();
        if (email && nickname) {
            setAvatarsList(__spreadArray([emailSrc, nameSrc], avatarsList.slice(2), true));
        }
        else if (email) {
            setAvatarsList(__spreadArray([emailSrc], avatarsList.slice(1), true));
        }
        else if (nickname) {
            setAvatarsList(__spreadArray([avatarsList[0], nameSrc], avatarsList.slice(2), true));
        }
    }
    function chooseAvatar(src) {
        return function () {
            setAvatar(src);
            setPopupShow(false);
        };
    }
    function generatePopupContent() {
        return (react_1["default"].createElement("div", { className: avatar_module_scss_1["default"]['avatar-panel-box'] }, avatarsList.map(function (src, index) { return (react_1["default"].createElement("div", { className: avatar_module_scss_1["default"]['avatar-panel-item'], key: index, onClick: chooseAvatar(src), style: {
                backgroundImage: 'url(' + src + ')'
            } })); })));
    }
    return (react_1["default"].createElement(StyledPopupButton, { color: "error", dense: true, text: true, show: popupShow, setShow: setPopupShow, beforeOpen: updateAvatarList, popupContent: generatePopupContent },
        react_1["default"].createElement("img", { className: avatar_module_scss_1["default"]['bbs-avatar'], src: avatar, alt: "" })));
}
Avatar.defaultProps = {
    size: 48,
    email: '',
    nickname: '',
    avatar: null
};
function propsAreEqual(prev, next) {
    return prev.size === next.size
        && prev.email === next.email
        && prev.nickname === next.nickname
        && prev.avatar === next.avatar;
}
exports["default"] = react_1["default"].memo(Avatar, propsAreEqual);
var templateObject_1;
//# sourceMappingURL=index.js.map