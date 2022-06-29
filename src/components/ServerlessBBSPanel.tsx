import React, {useEffect, useRef, useState} from 'react';
import BBSPanelCore from "./core/BBSPanelCore";
import PropTypes from "prop-types";
import {BBSPanelParams} from "../types";
import '../assets/css/common.scss'
import '../assets/css/highlight.scss'
import '../assets/css/github-markdown.scss'
// import useConvertLayer from "../server-layer/firebase/ConvertLayer";
import {readConfig}  from '../config'

function ServerlessBBSPanel(props:BBSPanelParams) {
    const [layerLoading, setLayerLoading]=useState(true)
    const useConvertLayer=useRef(null)
    useEffect(()=>{
        const {server}=readConfig()
        getServerLayer(server)
        .then((module)=>{
            useConvertLayer.current=module.default
            setLayerLoading(false)
        })
    },[])
    function getServerLayer(server){
        return server==='leancloud'
            ? import('../server-layer/leancloud/ConvertLayer')
            : import('../server-layer/firebase/ConvertLayer')
    }
    if(layerLoading)return null
    return (
        <section className="serverless-bbs">
            <BBSPanelCore {...props} useConvertLayer={useConvertLayer.current} />
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
