"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var App_1 = __importDefault(require("./App"));
var config_1 = require("./config");
(0, config_1.setConfig)({
    appId: "rYWlO5pCuJAiMPhGtmhvAaGv-MdYXbMMI",
    appKey: "SDfR94mcAqIigfFpzMYfKTxT",
    editMode: true,
    serverURLs: "rywlo5pc.api.lncldglobal.com",
    CommentClass: "Comments_demo",
    CounterClass: "Counters_demo",
    server: "leancloud"
});
// setConfig({
//     editMode:true,
//     CommentClass:"Comments_demo",
//     CounterClass:"Counters_demo",
//     apiKey: 'AIzaSyAQTct1trRnIB7QLE9RZ6qZgHGahVNrvco',
//     projectId: 'servelessbbs',
//     server:'firebase'
// })
react_dom_1["default"].render(react_1["default"].createElement(App_1["default"], null), document.getElementById('root'));
//# sourceMappingURL=index.js.map