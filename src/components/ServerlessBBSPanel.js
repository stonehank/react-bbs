import React, {useState} from 'react';
import '../assets/css/common.scss'
import '../assets/css/highlight.scss'
import '../assets/css/github-markdown.scss'
import panelStyle from '../assets/css/components/serverless-bbs-panel.module.scss'
import Avatar from "./inputs/Avatar";

function ServerlessBBSPanel(props) {
    const [avatar,setAvatar]=useState(null)

    return (
        <section className="serverless-bbs">
            <div className={panelStyle["bbs-input-box"]} >
                <div className={panelStyle["bbs-name-avatar bbs-input"]}>
                    <Avatar
                        avatar={avatar}
                        setAvatar={setAvatar}
                        email={'stonehank310@gmail.com'}
                        name={'stonehank'}
                    />
                    <NickName />
                </div>
                <Email />
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
