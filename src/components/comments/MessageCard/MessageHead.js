import React,{useMemo} from 'react';
import messageHeadStyle from './scss/message-head.module.scss'
import clx from 'classnames'
import timeAgo from "../../../utils/timeAgo";

function MessageHead(props) {
    const {details,small} = props
    const absoluteLink = useMemo(() => {
        let link=details.link
        if(!link)return link
        let isAbs= link.startsWith('http') || link.startsWith('//')
        if(!isAbs){
            link='https://'+link
        }else if(link.startsWith('//')){
            link='https:'+link
        }
        return link
    }, [details.link])

    return (
        <div
            className={clx({
                [messageHeadStyle['bbs-msg-header']]: true,
                [messageHeadStyle['header-sm']]: small,
            })}
        >
            <img
                className={messageHeadStyle["bbs-avatar"]}
                alt="avatar"
                src={details.avatar}
            />
            <div className={messageHeadStyle['bbs-msg-head-info']}>
                <span className={messageHeadStyle['bbs-nickname']}>
                    {
                        details.link
                            ?
                            <a href={absoluteLink} target="_blank" rel="noopener noreferrer nofollow">
                                {details.nickname}
                            </a>
                            :
                            <span>{details.nickname}</span>
                    }
                </span>
                <div className={messageHeadStyle['bbs-msg-date']}>
                    <span>{timeAgo(details.updatedAt)}</span>
                </div>
            </div>
        </div>
    );
}

export default MessageHead;
