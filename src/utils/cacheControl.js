import jsCookies from 'js-cookie';
var localStorage = window.localStorage;
function getFromCache(key) {
    var savedUserData = null;
    if (localStorage) {
        var value = localStorage.getItem(key);
        try {
            savedUserData = JSON.parse(value);
        }
        catch (_) {
            savedUserData = value;
        }
    }
    else {
        savedUserData = jsCookies.get(key);
    }
    return savedUserData;
}
function setCache(key, value, expires) {
    if (expires === void 0) { expires = 7; }
    var valueStr = JSON.stringify(value);
    if (localStorage) {
        localStorage.setItem(key, valueStr);
    }
    else {
        jsCookies.set(key, value, { expires: expires });
    }
}
export { getFromCache, setCache };
//# sourceMappingURL=cacheControl.js.map