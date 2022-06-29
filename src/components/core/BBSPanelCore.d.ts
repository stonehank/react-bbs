/// <reference types="react" />
declare type BBSPanelCoreProps = BBSPanelParams & {
    useConvertLayer: () => ConvertLayerIInterface;
};
declare function BBSPanelCore({ editable, pageSize, nest, offset, uniqStr, useConvertLayer }: BBSPanelCoreProps): JSX.Element;
export default BBSPanelCore;
