import React from 'react';
import InputInfoProvider from "../context/input-info/InputInfoProvider.tsx";
import BBSPanelCore from "./BBSPanelCore/index";
import PropTypes from "prop-types";

function ServerlessBBSPanel(props) {
    return (
        <InputInfoProvider {...props}>
            <BBSPanelCore />
        </InputInfoProvider>
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

export default ServerlessBBSPanel;
