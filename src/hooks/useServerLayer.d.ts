import { ConvertLayerIInterface } from '../types';
declare function useServerLayer(): {
    loading: boolean;
    useConvertLayer: () => ConvertLayerIInterface;
};
export default useServerLayer;
