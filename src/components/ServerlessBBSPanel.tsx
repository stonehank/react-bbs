import React from 'react';
import BBSPanelCore from "./core/BBSPanelCore";
import PropTypes from "prop-types";
import {BBSPanelParams} from "../types";
import '../assets/css/common.scss'
import '../assets/css/highlight.scss'
import '../assets/css/github-markdown.scss'
import useConvertLayer from "../server-layer/leancloud/ConvertLayer";


function ServerlessBBSPanel(props:BBSPanelParams) {
    return (
        <section className="serverless-bbs">
            <BBSPanelCore {...props} useConvertLayer={useConvertLayer} />
        </section>
    );
}

ServerlessBBSPanel.propTypes={
    pageSize:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    nest:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    offset:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    uniqStr:PropTypes.string,
    editable:PropTypes.bool,
}

ServerlessBBSPanel.defaultProps={
    editable:true,
    pageSize:5,
    nest:1,
    offset:0,
    uniqStr: window.location.origin + window.location.pathname,
}
function propsAreEqual(prevProps, nextProps) {
    // uniqStr,nest,pageSize,offset,editable
    return prevProps.nest === nextProps.nest
        && prevProps.uniqStr === nextProps.uniqStr
        && prevProps.pageSize === nextProps.pageSize
        && prevProps.editable === nextProps.editable
        && prevProps.offset === nextProps.offset
}
const MemoizedServerlessBBSPanel = React.memo(ServerlessBBSPanel, propsAreEqual);

export default MemoizedServerlessBBSPanel;
