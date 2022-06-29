// eslint-disable-next-line no-unused-vars
import { useEffect, useRef } from 'react';
function useDidUpdate(callback, dependencies) {
    var mounted = useRef(false);
    useEffect(function () {
        if (!mounted.current) {
            mounted.current = true;
            return;
        }
        callback();
    }, dependencies);
}
export default useDidUpdate;
//# sourceMappingURL=useDidUpdate.js.map