"use strict";
exports.__esModule = true;
var react_1 = require("react");
function useSyncState(initialState) {
    var _a = (0, react_1.useState)(initialState), state = _a[0], _setState = _a[1];
    var syncState = (0, react_1.useRef)(initialState);
    function setState(newState) {
        _setState(newState);
        syncState.current = newState;
    }
    return [state, syncState, setState];
}
exports["default"] = useSyncState;
//# sourceMappingURL=useSyncState.js.map