import React, { useMemo } from 'react';
import messageHeadStyle from './scss/message-head.module.scss';
import clx from 'classnames';
import timeAgo from '../../../utils/timeAgo';
function MessageHead(props) {
    var _a;
    var details = props.details, small = props.small;
    var absoluteLink = useMemo(function () {
        var link = details.link;
        if (!link)
            return link;
        var isAbs = link.startsWith('http') || link.startsWith('//');
        if (!isAbs) {
            link = 'https://' + link;
        }
        else if (link.startsWith('//')) {
            link = 'https:' + link;
        }
        return link;
    }, [details.link]);
    return (React.createElement("div", { className: clx((_a = {},
            _a[messageHeadStyle['bbs-msg-header']] = true,
            _a[messageHeadStyle['header-sm']] = small,
            _a)) },
        React.createElement("img", { className: messageHeadStyle['bbs-avatar'], alt: 'avatar', src: details.avatar }),
        React.createElement("div", { className: messageHeadStyle['bbs-msg-head-info'] },
            React.createElement("span", { className: messageHeadStyle['bbs-nickname'] }, details.link ? (React.createElement("a", { href: absoluteLink, target: '_blank', rel: 'noopener noreferrer nofollow' }, details.nickname)) : (React.createElement("span", null, details.nickname))),
            React.createElement("div", { className: messageHeadStyle['bbs-msg-date'] },
                React.createElement("span", null, timeAgo(details.updatedAt))))));
}
export default React.memo(MessageHead);
//# sourceMappingURL=MessageHead.js.map