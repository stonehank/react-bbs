import { useEffect, useRef, useState } from 'react';
import { readConfig } from '../config';
function getServerLayer(server) {
    return server === 'leancloud'
        ? import('../server-layer/leancloud/ConvertLayer')
        : import('../server-layer/firebase/ConvertLayer');
}
function useServerLayer() {
    var _a = useState(true), loading = _a[0], setLoading = _a[1];
    var useConvertLayer = useRef(null);
    useEffect(function () {
        var server = readConfig().server;
        getServerLayer(server).then(function (module) {
            useConvertLayer.current = module["default"];
            setLoading(false);
        });
    }, []);
    return { loading: loading, useConvertLayer: useConvertLayer.current };
}
export default useServerLayer;
//# sourceMappingURL=useServerLayer.js.map