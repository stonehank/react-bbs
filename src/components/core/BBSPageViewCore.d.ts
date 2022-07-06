/// <reference types="react" />
import { ConvertLayerIInterface } from '../../types';
declare type Props = {
    uniqStr: string;
    useConvertLayer: () => ConvertLayerIInterface;
};
declare function BBSPageViewCore({ uniqStr, useConvertLayer }: Props): JSX.Element;
export default BBSPageViewCore;
