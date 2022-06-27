import React from 'react';
import panelStyle from "../../core/bbs-panel-core.module.scss";
import Avatar from "../Avatar";
import Email from "../Email";
import Nickname from "../Nickname";

type UserInfoProps={
    bbsInputBoxRef:React.Ref<any>,
    nicknameRef:React.Ref<any>,
    emailRef:React.Ref<any>,
    nickname:string,
    avatar:string,
    email:string,
    setAvatar:(avatar:string)=>void,
    setNickname:(nickname:string)=>void,
    setEmail:(email:string)=>void,
}

function UserInfo(props:UserInfoProps) {
    const {bbsInputBoxRef,nicknameRef,emailRef,avatar,nickname,email,setAvatar,setNickname,setEmail} = props
    return (
        <div className={panelStyle["bbs-input-box"]} >
            <div className={panelStyle["bbs-name-avatar"] +' ' +panelStyle["bbs-input"]} ref={bbsInputBoxRef}>
                <Avatar
                    avatar={avatar}
                    setAvatar={setAvatar}
                    email={email}
                    nickname={nickname}
                />
                <Nickname
                    style={{flex:1}}
                    ref={nicknameRef}
                    nickname={nickname}
                    setNickname={setNickname}
                />
            </div>
            <div className={panelStyle["bbs-input"]}>
                <Email
                    ref={emailRef}
                    email={email}
                    setEmail={setEmail}
                />
            </div>
        </div>
    );
}

export default React.memo(UserInfo);
