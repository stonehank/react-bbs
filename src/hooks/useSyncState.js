// eslint-disable-next-line no-unused-vars
import { useRef, useState } from 'react';
function useSyncState(initialState) {
    var _a = useState(initialState), state = _a[0], _setState = _a[1];
    var syncState = useRef(initialState);
    function setState(newState) {
        _setState(newState);
        syncState.current = newState;
    }
    return [state, syncState, setState];
}
export default useSyncState;
//# sourceMappingURL=useSyncState.js.map