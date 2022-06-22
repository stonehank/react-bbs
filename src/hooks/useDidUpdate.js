"use strict";
exports.__esModule = true;
var react_1 = require("react");
function useDidUpdate(callback, dependencies) {
    if (dependencies === void 0) { dependencies = []; }
    var mounted = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(function () {
        if (!mounted.current) {
            mounted.current = true;
            return;
        }
        callback();
    }, dependencies);
}
exports["default"] = useDidUpdate;
//# sourceMappingURL=useDidUpdate.js.map