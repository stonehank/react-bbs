import React from 'react';
import loadingStyle from './loading.module.scss';
function Loading(props) {
    return (React.createElement("div", { className: 'serverless-bbs ' + loadingStyle['lds-ring'], style: {
            width: props.size,
            height: props.size
        } },
        React.createElement("div", null),
        React.createElement("div", null),
        React.createElement("div", null),
        React.createElement("div", null)));
}
Loading.defaultProps = {
    size: 64
};
export default Loading;
//# sourceMappingURL=index.js.map