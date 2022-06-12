import React from 'react';
import './loading.scss'
function Loading(props) {
    return (
        <div
            className="lds-ring serverless-bbs"
            style={{
                width:props.size,
                height:props.size,
            }}
        >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
)
    ;
}
Loading.defaultProps={
    size: 64
}

export default Loading;
