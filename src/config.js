"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateConfig() {
    /**
     *
     * appId:"#########-####",
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
        /*enum {firebase, leancloud}*/
        server: 'firebase'
    };
    var stableConfig = {
        UserClass: "_User",
        initialLoading: true,
        countMap: new Map(),
        pageviewMap: new Map(),
    };
    var loggedUser = null;
    return {
        setConfig: function (newConfigs) {
            configs = Object.assign({}, configs, newConfigs);
        },
        readConfig: function () {
            return Object.assign({}, configs, stableConfig);
        },
        setLoggedUser: function (user) {
            loggedUser = user;
        },
        readLoggedUser: function () {
            return loggedUser;
        },
    };
}
exports.default = generateConfig();
