import React, { useCallback, useState } from 'react';
import Loading from '../UI/Loading';
import Button from '../UI/Button';
function MoreButton(props) {
    var align = props.align, noMoreData = props.noMoreData, simple = props.simple, loadMore = props.loadMore;
    var _a = useState(false), moreLoading = _a[0], setMoreLoading = _a[1];
    var load = useCallback(function () {
        setMoreLoading(true);
        loadMore()["finally"](function () { return setMoreLoading(false); });
    }, [loadMore]);
    if (moreLoading)
        return (React.createElement("div", { className: 'text-' + align },
            React.createElement(Loading, { size: 24 })));
    if (noMoreData && simple)
        return null;
    return (React.createElement("div", { className: 'text-' + align },
        React.createElement(Button, { disabled: noMoreData, text: noMoreData || simple, color: noMoreData ? 'secondary' : 'info', dense: simple, onClick: load }, noMoreData ? '没有更多了' : '查看更多')));
}
MoreButton.defaultProps = {
    simple: false,
    align: 'center'
};
export default MoreButton;
//# sourceMappingURL=MoreButton.js.map