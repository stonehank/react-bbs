"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("react-app-polyfill/ie11");
var React = require("react");
var ReactDOM = require("react-dom");
var _1 = require("../.");
(0, _1.setConfig)({
    apiKey: 'AIzaSyAQTct1trRnIB7QLE9RZ6qZgHGahVNrvco',
    projectId: 'servelessbbs',
    editMode: true,
    CommentClass: "Comments_demo",
    CounterClass: "Counters_demo",
    server: "firebase"
});
var App = function () {
    return (React.createElement("div", null,
        React.createElement(_1.ServerlessBBSPanel, null)));
};
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map