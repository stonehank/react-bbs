import React, { useImperativeHandle, useRef } from 'react';
import panelStyle from '../../core/bbs-panel-core.module.scss';
import Avatar from '../Avatar';
import Email from '../Email';
import Nickname from '../Nickname';
import { scrollToEle } from '../../../utils/index';
import useUserCacheData from '../../../hooks/useUserCacheData';
var UserInfo = React.forwardRef(function (_, forwardRef) {
    var nicknameRef = useRef(null);
    var emailRef = useRef(null);
    var bbsInputBoxRef = useRef(null);
    var _a = useUserCacheData(), avatar = _a.avatar, email = _a.email, nickname = _a.nickname, setAvatar = _a.setAvatar, setEmail = _a.setEmail, setNickname = _a.setNickname;
    function scrollToMessageInput(offset) {
        return scrollToEle(bbsInputBoxRef.current, {
            highlight: false,
            smooth: true,
            offset: offset
        });
    }
    function validate() {
        return nicknameRef.current.validate() && emailRef.current.validate();
    }
    useImperativeHandle(forwardRef, function () { return ({
        scrollToMessageInput: scrollToMessageInput,
        validate: validate,
        avatar: avatar,
        email: email,
        nickname: nickname
    }); });
    return (React.createElement("div", { className: panelStyle['bbs-input-box'] },
        React.createElement("div", { className: panelStyle['bbs-name-avatar'] + ' ' + panelStyle['bbs-input'], ref: bbsInputBoxRef },
            React.createElement(Avatar, { avatar: avatar, setAvatar: setAvatar, email: email, nickname: nickname }),
            React.createElement(Nickname, { style: { flex: 1 }, ref: nicknameRef, nickname: nickname, setNickname: setNickname })),
        React.createElement("div", { className: panelStyle['bbs-input'] },
            React.createElement(Email, { ref: emailRef, email: email, setEmail: setEmail }))));
});
export default React.memo(UserInfo);
//# sourceMappingURL=index.js.map