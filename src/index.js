import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App";
import configMethods from './config'

configMethods.setConfig({
    appId:"rYWlO5pCuJAiMPhGtmhvAaGv-MdYXbMMI",
    appKey:"SDfR94mcAqIigfFpzMYfKTxT",
    editMode:true,
    serverURLs:"rywlo5pc.api.lncldglobal.com",
    CommentClass:"Comments_demo",
    CounterClass:"Counters_demo",
})

ReactDOM.render(
    <App />, document.getElementById('root'));
