var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PopupButton from '../../UI/PopupButton';
import avatarStyle from './avatar.module.scss';
import crypto from 'blueimp-md5';
import useDidUpdate from '../../../hooks/useDidUpdate';
var StyledPopupButton = styled(PopupButton)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 0 0 16px 0;\n  opacity: 1;\n"], ["\n  margin: 0 0 16px 0;\n  opacity: 1;\n"])));
function Avatar(props) {
    var avatar = props.avatar, setAvatar = props.setAvatar, email = props.email, nickname = props.nickname, size = props.size;
    var _a = useState(false), popupShow = _a[0], setPopupShow = _a[1];
    var _b = useState([]), avatarsList = _b[0], setAvatarsList = _b[1];
    // todo constant
    var GRAVATAR_URL = 'https://gravatar.loli.net/avatar';
    useEffect(function () {
        var emailSrc = createEmailSrc();
        var nameSrc = createNameSrc();
        var others = ['mp', 'identicon', 'monsterid', 'retro', 'robohash', 'wavatar'].map(function (str) { return "".concat(GRAVATAR_URL, "/?d=").concat(str, "&size=").concat(size); });
        var newAvatarList = __spreadArray([emailSrc, nameSrc], others, true);
        setAvatarsList(newAvatarList);
        if (avatar)
            return;
        var rdAvatar = newAvatarList[Math.floor(Math.random() * newAvatarList.length)];
        setAvatar(rdAvatar);
    }, []);
    useDidUpdate(function () {
        updateAvatarList();
    }, [email, nickname, size]);
    function createEmailSrc() {
        return email
            ? "https://www.gravatar.com/avatar/".concat(crypto(email.toLowerCase().trim()), "?s=").concat(size)
            : "https://www.gravatar.com/avatar?s=".concat(size);
    }
    function createNameSrc() {
        return nickname
            ? "https://ui-avatars.com/api/?background=199ed9&color=fff&name=".concat(nickname, "&size=").concat(size)
            : "https://ui-avatars.com/api/?background=199ed9&color=fff&name=&size=".concat(size);
    }
    var updateAvatarList = useCallback(function () {
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
    }, [email, nickname]);
    var chooseAvatar = useCallback(function (src) {
        return function () {
            setAvatar(src);
            setPopupShow(false);
        };
    }, []);
    var generatePopupContent = useCallback(function () {
        return (React.createElement("div", { className: avatarStyle['avatar-panel-box'] }, avatarsList.map(function (src, index) { return (React.createElement("div", { className: avatarStyle['avatar-panel-item'], key: index, onClick: chooseAvatar(src), style: {
                backgroundImage: 'url(' + src + ')'
            } })); })));
    }, [avatarsList]);
    return (React.createElement(StyledPopupButton, { color: 'error', dense: true, text: true, show: popupShow, setShow: setPopupShow, beforeOpen: updateAvatarList, popupContent: generatePopupContent },
        React.createElement("img", { className: avatarStyle['bbs-avatar'], src: avatar, alt: '' })));
}
Avatar.defaultProps = {
    size: 48,
    email: '',
    nickname: '',
    avatar: null
};
export default React.memo(Avatar);
var templateObject_1;
//# sourceMappingURL=index.js.map