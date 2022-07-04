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
    UserClass: '_User',
    initialLoading: true,
    countMap: new Map(),
    pageviewMap: new Map()
};
var loggedUser;
function setConfig(newConfigs) {
    console.log(newConfigs.server);
    configs = Object.assign({}, configs, newConfigs);
}
function readConfig() {
    return Object.assign({}, configs, stableConfig);
}
function setLoggedUser(user) {
    loggedUser = user;
}
function readLoggedUser() {
    return loggedUser;
}
export { setConfig, readConfig, setLoggedUser, readLoggedUser };
//# sourceMappingURL=config.js.map