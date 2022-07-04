import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/common.scss';
import '../assets/css/highlight.scss';
import '../assets/css/github-markdown.scss';
import { BBSPanelParams } from '../types';
declare function ServerlessBBSPanel(props: BBSPanelParams): JSX.Element;
declare namespace ServerlessBBSPanel {
    var propTypes: {
        pageSize: PropTypes.Requireable<string | number>;
        nest: PropTypes.Requireable<string | number>;
        offset: PropTypes.Requireable<string | number>;
        uniqStr: PropTypes.Requireable<string>;
        editable: PropTypes.Requireable<boolean>;
    };
    var defaultProps: {
        editable: boolean;
        pageSize: number;
        nest: number;
        offset: number;
        uniqStr: string;
    };
}
declare const _default: React.MemoExoticComponent<typeof ServerlessBBSPanel>;
export default _default;
