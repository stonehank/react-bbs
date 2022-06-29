"use strict";
// import LeanCloudLayer from "./server-layer/leancloud/ConvertLayer";
// import FirebaseLayer from "./server-layer/firebase/ConvertLayer";
exports.__esModule = true;
exports.readLoggedUser = exports.setLoggedUser = exports.readConfig = exports.setConfig = void 0;
/**
 *
 appId:"#########-####",
 appKey:"#######",
 serverURLs:"#####.##.##.com",
 editMode:false,
 CommentClass:"Comments",
 CounterClass:"Counters",


 apiKey: '############',
 projectId: '########'
 */
var configs = {
    apiKey: null,
    projectId: null,
    appId: null,
    appKey: null,
    serverURLs: null,
    editMode: false,
    CommentClass: 'Comments_demo',
    CounterClass: 'Counters_demo',
    server: 'leancloud'
};
var stableConfig = {
    UserClass: "_User",
    initialLoading: true,
    countMap: new Map(),
    pageviewMap: new Map()
};
var loggedUser = null;
function setConfig(newConfigs) {
    configs = Object.assign({}, configs, newConfigs);
}
exports.setConfig = setConfig;
function readConfig() {
    return Object.assign({}, configs, stableConfig);
}
exports.readConfig = readConfig;
function setLoggedUser(user) {
    loggedUser = user;
}
exports.setLoggedUser = setLoggedUser;
function readLoggedUser() {
    return loggedUser;
}
exports.readLoggedUser = readLoggedUser;
//# sourceMappingURL=config.js.map