import React, {useState} from 'react';
import '../assets/css/common.scss'
import '../assets/css/highlight.scss'
import '../assets/css/github-markdown.scss'
import panelStyle from '../assets/css/components/serverless-bbs-panel.module.scss'
import Avatar from "./inputs/Avatar";
import useUserInfo from "../hooks/useUserInfo";
import Nickname from "./inputs/Nickname";
import Email from "./inputs/Email";

function ServerlessBBSPanel(props) {
    const {
        avatar,
        email,
        nickname,
        setAvatar,
        setEmail,
        setNickname
    } = useUserInfo()

    return (
        <section className="serverless-bbs">
            <div className={panelStyle["bbs-input-box"]} >
                <div className={panelStyle["bbs-name-avatar bbs-input"]}>
                    <Avatar
                        avatar={avatar}
                        setAvatar={setAvatar}
                        email={email}
                        nickname={nickname}
                    />
                    <Nickname
                        nickname={nickname}
                        setNickname={setNickname}
                    />
                </div>
                <Email
                    email={email}
                    setEmail={setEmail}
                />
            </div>
            <MessageInput />
            <ActionsController />
            <div className="text-right mt-2">
                <Button>提交</Button>
            </div>
            <CommentList />
        </section>
    );
}

export default ServerlessBBSPanel;
